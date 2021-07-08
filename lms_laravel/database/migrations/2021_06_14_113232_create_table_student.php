<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableStudent extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('fname');
            $table->string('lname');
            $table->string('fathername');
            $table->string('mothername');
            $table->string('gender');
            $table->date('dateofbirth')->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('pnumber')->unique()->nullable();
            $table->string('address')->nullable();
            $table->string('image')->nullable();
            $table->string('HealthProblems')->nullable()->default('NULL');;
            $table->string('bloodType')->nullable();
            $table->foreignId('section_id')->constrained('sections');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
