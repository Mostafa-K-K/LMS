# Adding JWT Authentication to our Laravel Project

So in our application we have created simple Todo CRUD functionalities that anyone can access and perform actions on regardless of whether they are his/her own tasks. Now however we will be adding authentication to stop that from happening. Normally Laravel provides us with authentication, however we willbe using JWT and as of such we will be creating our own simple authentication process. Let us start by installing our jwt package.

`composer require tymon/jwt-auth "1.0.*"`

Next we have to publish the package as such:

`php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider" `

A new config file gets generated in config/jwt.php. Next step is to generate a secret key. We’ll use this key to sign all of our tokens. Now we need to run `php artisan jwt:secret` to add the JWT variables to the .env file.

Now we need to modify the User model so that it implements the JWT interface and add two functions to it. It will look something like this:


```
namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
  use Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'name', 'email', 'password',
  ];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [
      'password', 'remember_token',
  ];

  /**
   * The attributes that should be cast to native types.
   *
   * @var array
   */
  protected $casts = [
      'email_verified_at' => 'datetime',
  ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
    public function setPasswordAttribute($password)
    {
        if ( !empty($password) ) {
            $this->attributes['password'] = bcrypt($password);
        }
    }    
  }
```

Now we move on to the `config/auth.php` where we need to modify the following lines:

```
'defaults' => [
    'guard' => 'api',
    'passwords' => 'users',
  ],

  'guards' => [
    'api' => [
      'driver' => 'jwt',
      'provider' => 'users',
    ],
  ],
```

Once this is done create a new controller called AuthController and create the Login, register and logout functions

```

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $user = User::create([
             'name' => $request->name,
             'email'    => $request->email,
             'password' => $request->password,
         ]);

        $token = auth()->login($user);

        return $this->respondWithToken($token);
    }

    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth()->factory()->getTTL() * 60
        ]);
    }
}
```

And create the routes for them.

```
Route::post('/register', 'AuthController@register');
Route::post('/login', 'AuthController@login');
Route::post('/logout', 'AuthController@logout');
```

Ok now we are almost done. We need to create the middleware for JWT and register it before we can use it.
Use `php artisan make:middleware JwtMiddleware` to create a new middleware and add to it the following code:

```
namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Exception;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class JwtMiddleware extends BaseMiddleware
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                return response()->json(['status' => 'Token is Invalid']);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                return response()->json(['status' => 'Token is Expired']);
            }else{
                return response()->json(['status' => 'Authorization Token not found']);
            }
        }
        return $next($request);
    }
}
```

And then open the `http/Kernel.php` and add the following line to the `$routeMiddleware` array:
``` 'jwt.verify' => \App\Http\Middleware\JwtMiddleware::class, ```

Ok we are almost done. We just need to add a middleware group for our routes. Our `api.php` file content will look like this:

```
Route::post('/register', 'AuthController@register');
Route::post('/login', 'AuthController@login');
Route::post('/logout', 'AuthController@logout');

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/tasks', 'TaskController@index');
    Route::get('/task/{id}', 'TaskController@show');
    Route::post('/task/{id}', 'TaskController@update');
    Route::post('/task', 'TaskController@store');
    Route::delete('/task/{id}', 'TaskController@destroy');
});
```

We are now ready to use JWT authentication.
