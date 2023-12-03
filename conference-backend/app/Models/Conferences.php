<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conferences extends Model
{
        public $timestamps = true;
     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
            'conference_name' ,
            'conference_description' ,
            'conference_start_date' ,
            'conference_end_date', 
    ];

    use HasFactory;
}
