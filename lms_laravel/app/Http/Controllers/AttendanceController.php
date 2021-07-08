<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{

    public function createAttendance(Request $request)
    {
        $data = new Attendance;
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

    public function getAttendances()
    {
        try {
            $data = Attendance::all();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function getAttendance($id)
    {
        try {
            $data = Attendance::where('id', $id)->first();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function updateAttendance($id, Request $request)
    {
        try {
            $data = Attendance::where('id', $id)->first();
            $data->update($request->all());
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function deleteAttendance($id)
    {
        try {
            $data = Attendance::where('id', $id)->delete();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function chart(Request $request)
    {
        try {
            $data = Attendance::groupBy('description')
                ->selectRaw('count(id) as value, description')
                // ->where('section_id', 'like', $request->section_id)
                ->where('created_at', 'like', $request->date . '%')
                ->get();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

}
