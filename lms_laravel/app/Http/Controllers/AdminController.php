<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;

class AdminController extends Controller
{

    public function createAdmin(Request $request)
    {
        $data = new Admin;
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

    public function getAdmins()
    {
        try {
            $data = Admin::all();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function getAdmin($id)
    {
        try {
            $data = Admin::where('id', $id)->first();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function getAdminByUsername(Request $request)
    {
        try {
            $data = Admin::where('username', $request->username)->first();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function updateAdmin($id, Request $request)
    {
        try {
            $data = Admin::where('id', $id)->first();
            $data->update($request->all());
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function deleteAdmin($id)
    {
        try {
            $data = Admin::where('id', $id)->delete();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

}
