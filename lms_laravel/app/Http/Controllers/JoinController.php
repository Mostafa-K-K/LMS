<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Section;
use App\Models\Student;
use Illuminate\Http\Request;

class JoinController extends Controller
{

    public function studentInfobyid($id)
    {
        try {
            $data = Student::join('sections', 'section_id', '=', 'sections.id')
                ->join('classrooms', 'classroom_id', '=', 'classrooms.id')
                ->where('students.id', '=', $id)
                ->first([
                    'students.*',
                    'sections.name as section_name',
                    'classrooms.id as classroom_id',
                    'classrooms.name as classroom_name',
                ]);
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function studentFullInfo(Request $request)
    {
        try {
            $data = Student::join('sections', 'section_id', '=', 'sections.id')
                ->join('classrooms', 'classroom_id', '=', 'classrooms.id')
                ->orderBy('fname')
                ->get([
                    'students.*',
                    'sections.name as section_name',
                    'classrooms.id as classroom_id',
                    'classrooms.name as classroom_name',
                ]);

            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function attendanceFullInfo()
    {
        try {
            $data = Attendance::join('students', 'student_id', '=', 'students.id')
                ->join('sections', 'students.section_id', '=', 'sections.id')
                ->join('classrooms', 'classroom_id', '=', 'classrooms.id')
                ->get([
                    'attendances.*',
                    'students.fname',
                    'students.lname',
                    'sections.name as section_name',
                    'classrooms.id as classroom_id',
                    'classrooms.name as classroom_name',
                ]);
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function attendanceInfobysection($id)
    {
        try {
            $data = Attendance::join('students', 'student_id', '=', 'students.id')
                ->join('sections', 'students.section_id', '=', 'sections.id')
                ->join('classrooms', 'classroom_id', '=', 'classrooms.id')
                ->where('sections.id', '=', $id)
                ->get([
                    'attendances.*',
                    'students.fname',
                    'students.lname',
                    'sections.name as section_name',
                    'classrooms.id as classroom_id',
                    'classrooms.name as classroom_name',
                ]);
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function attendanceInfobyclassroom($id)
    {
        try {
            $data = Attendance::join('students', 'student_id', '=', 'students.id')
                ->join('sections', 'students.section_id', '=', 'sections.id')
                ->join('classrooms', 'classroom_id', '=', 'classrooms.id')
                ->where('sections.classroom_id', '=', $id)
                ->get([
                    'attendances.*',
                    'students.fname',
                    'students.lname',
                    'sections.name as section_name',
                    'classrooms.id as classroom_id',
                    'classrooms.name as classroom_name',
                ]);
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function sectionFullInfo()
    {
        try {
            $data = Section::join('classrooms', 'classroom_id', '=', 'classrooms.id')
                ->orderBy('classrooms.name')
                ->orderBy('sections.name')
                ->get(['sections.*', 'classrooms.name as classroom_name']);
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function sectionInfobyid($id)
    {
        try {
            $data = Section::join('classrooms', 'classroom_id', '=', 'classrooms.id')
                ->where('sections.id', '=', $id)
                ->first(['sections.*', 'classrooms.name as classroom_name']);
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

    public function sectionInfobyclass($id)
    {
        try {
            $data = Section::join('classrooms', 'classroom_id', '=', 'classrooms.id')
                ->where('classroom_id', '=', $id)
                ->get(['sections.*', 'classrooms.name as classroom_name']);
            return [
                'success' => true,
                'data' => $data,
            ];
        } catch (Exception $e) {
            return false;
        }
    }

}
