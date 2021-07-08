<?php

return [

    'defaults' => [
        'guard' => 'api',
        'passwords' => 'admins',
    ],

    'guards' => [
        'api' => [
            'driver' => 'jwt',
            'provider' => 'admins',
        ],

        // 'api' => [
        //     'driver' => 'token',
        //     'provider' => 'admins',
        //     'hash' => false,
        // ],
    ],

    'providers' => [
        'admins' => [
            'driver' => 'eloquent',
            'model' => App\Models\Admin::class,
        ],

        // 'users' => [
        //     'driver' => 'database',
        //     'table' => 'users',
        // ],
    ],

    'passwords' => [
        'admins' => [
            'provider' => 'admins',
            'table' => 'password_resets',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => 10800,

];
