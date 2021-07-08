<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function createSection(Request $request)
    {
        $data = new Section;
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

    public function getSections()
    {
        try {
            $data = Section::all();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function getSection($id)
    {
        try {
            $data = Section::where('id', $id)->first();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function getSectionClassroom($id)
    {
        try {
            $data = Section::where('classroom_id', $id)
                ->orderBy('name')
                ->get();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function updateSection($id, Request $request)
    {
        try {
            $data = Section::where('id', $id)->first();
            $data->update($request->all());
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function deleteSection($id)
    {
        try {
            $data = Section::where('id', $id)->delete();
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }
}
