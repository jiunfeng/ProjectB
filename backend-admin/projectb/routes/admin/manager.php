<?php

use App\Http\Controllers\Admin\ManagerController;
use Illuminate\Support\Facades\Route;

Route::group(["prefix" => "manager"], function () {
    Route::any("/", [ManagerController::class, "list"]);
    Route::any("add", [ManagerController::class, "add"]);
    Route::any("insert", [ManagerController::class, "insert"]);
    Route::any("edit/{id}", [ManagerController::class, "edit"]);
    Route::any("update/{id}", [ManagerController::class, "update"]);
});

Route::any("delete", [ManagerController::class, "delete"]);
