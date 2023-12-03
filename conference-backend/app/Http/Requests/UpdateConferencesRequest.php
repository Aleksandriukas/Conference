<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateConferencesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'conference_name' => 'required|string|max:255',
            'conference_description' => 'required|string|max:255',
            'conference_start_date' => 'required|date',
            'conference_end_date' => 'required|date|after:conference_start_date',
        ];
    }
}
