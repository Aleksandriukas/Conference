<?php

namespace App\Http\Controllers\Api;

use App\Models\Conferences;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreConferencesRequest;
use App\Http\Requests\UpdateConferencesRequest;
use App\Http\Resources\ConferenceResource;
use Illuminate\Http\Response;

class ConferencesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ConferenceResource::collection(Conferences::query()->orderBy('conference_start_date')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreConferencesRequest $request)
    {
        $data = $request->validated();
        Conferences::create($data);
        return new response("",201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Conferences $conferences)
    {
        return new ConferenceResource($conferences);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateConferencesRequest $request
     * @param \App\Models\Conferences                     $conferences
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateConferencesRequest $request)
    {
        $data = $request->validated();

        // Debugging - Log the validated data
     \Log::info('Validated Data:', $data);


        $model = Conferences::where('id', $data['id'])->first();
        $model->update($data);

        return new response("",200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $model = Conferences::where('id', $id)->first();
        $model->delete();

        return response("", 200);
    }
}
