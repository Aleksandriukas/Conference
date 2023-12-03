<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConferenceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'conference_name' => $this->conference_name,
            'conference_description' => $this->conference_description,
            'conference_start_date' => $this->conference_start_date,
            'conference_end_date' => $this->conference_end_date,
        ];
    }
}
