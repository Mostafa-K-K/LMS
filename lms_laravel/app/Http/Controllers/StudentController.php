<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{

    public function createStudent(Request $request)
    {
        $data = new Student;
        try {
            if ($request->image && $request->image !== "") {
                $image = $request->image;
                $name = time() . '.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                \Image::make($request->get('image'))->save(storage_path('app/public/images/') . $name);
            }
            $data->fill($request->all());
            $data->image = $name;
            $data->save();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function getStudents()
    {
        try {
            $data = Student::all();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function getStudent($id)
    {
        try {
            $data = Student::where('id', $id)->first();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function updateStudent($id, Request $request)
    {
        $data = Student::where('id', $id)->first();

        try {
            if ($request->image && $request->image !== $data->image) {
                $image = $request->image;
                $name = time() . '.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                \Image::make($request->get('image'))->save(storage_path('app/public/images/') . $name);
                if (file_exists(storage_path('app/public/images/') . $data->image)) {
                    unlink(storage_path('app/public/images/') . $data->image);
                }
                $data->update(['image' => $name]);
            }

            $data->update(['fname' => $request->fname]);
            $data->update(['lname' => $request->lname]);
            $data->update(['fathername' => $request->fathername]);
            $data->update(['mothername' => $request->mothername]);
            $data->update(['gender' => $request->gender]);
            $data->update(['dateofbirth' => $request->dateofbirth]);
            $data->update(['email' => $request->email]);
            $data->update(['pnumber' => $request->pnumber]);
            $data->update(['address' => $request->address]);
            $data->update(['HealthProblems' => $request->HealthProblems]);
            $data->update(['bloodType' => $request->bloodType]);
            $data->update(['section_id' => $request->section_id]);
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function deleteStudent($id)
    {
        try {
            $data = Student::where('id', $id)->first();
            if ($data->image && (file_exists(storage_path('app/public/images/') . $data->image))) {
                unlink(storage_path('app/public/images/') . $data->image);
            }
            $data = Student::where('id', $id)->delete();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

}
