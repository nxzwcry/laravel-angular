<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\LessonSaving' => [
            'App\Listeners\LessonSavingListener',
        ],
        'App\Events\LessonCreating' => [
            'App\Listeners\LessonCreatingListener',
        ],
        'App\Events\CourseSaved' => [
            'App\Listeners\CourseSavedListener',
        ],
        'App\Events\LessonSaved' => [
            'App\Listeners\LessonSavedListener',
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
