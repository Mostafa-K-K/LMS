<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use Illuminate\Http\Request;

class ClassroomController extends Controller
{

    public function createClassroom(Request $request)
    {
        $data = new Classroom;
        try {
            $data->fill($request->all());
            $data->save();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function getClassrooms()
    {
        try {
            $data = Classroom::all();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function getClassroom($id)
    {
        try {
            $data = Classroom::where('id', $id)->first();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function updateClassroom($id, Request $request)
    {
        try {
            $data = Classroom::where('id', $id)->first();
            $data->update($request->all());
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function deleteClassroom($id)
    {
        try {
            $data = Classroom::where('id', $id)->delete();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

}
