@extends('layouts.layout')

@section('content')
    <div  id="app" class="flex-center position-ref full-height">
        <div class="container">
            <div class="row">
                <div class="col text-right">
                    <h2 class="border-bottom border-success">תעודת אחריות</h2>
                    <warranty-form></warranty-form>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('form')
    <form
            @submit="checkForm"
            action="/submit-form"
            method="POST"
            class="form-rtl" novalidate="true">
        <div class="form-group row">
            <label class="col-12 col-form-label font-weight-bold">פרטי לקוח:</label>
        </div>
        <div class="form-group row">
            <label for="fullName" class="col-12 col-md-3 col-lg-2 col-form-label">* שם מלא:</label>
            <div class="col-12 col-md-9 col-lg-6">
                <input type="text" class="form-control" id="fullName" v-model="fullName" required>
                <div class="invalid-feedback">
                    אנא הזן שם מלא:
                </div>
            </div>
        </div>
        <div class="form-group row">
            <label for="address" class="col-12 col-md-3 col-lg-2 col-form-label">כתובת:</label>
            <div class="col-12 col-md-9 col-lg-6">
                <input type="text" class="form-control" id="address" v-model="address">
            </div>
        </div>
        <div class="form-group row">
            <label for="phoneHome" class="col-12 col-md-3 col-lg-2 col-form-label">טלפון בית:</label>
            <div class="col-12 col-md-9 col-lg-6">
                <input type="tel" class="form-control" id="phoneHome" v-model="phoneHome">
            </div>
        </div>
        <div class="form-group row">
            <label for="phoneMobile" class="col-12 col-md-3 col-lg-2 col-form-label">טלפון נייד:</label>
            <div class="col-12 col-md-9 col-lg-6">
                <input type="tel" class="form-control" id="phoneMobile" v-model="phoneMobile">
            </div>
        </div>
        <div class="form-group row">
            <label for="email" class="col-12 col-md-3 col-lg-2 col-form-label">* דואר אלקטרוני:</label>
            <div class="col-12 col-md-9 col-lg-6">
                <input type="email" class="form-control" id="email" v-model="email" required>
                <div class="invalid-feedback">
                    אנא הזן דואר אלקטרוני:
                </div>
            </div>
        </div>

        <div class="form-group row">
            <label class="col-12 col-form-label font-weight-bold">פרטי המוצר:</label>
        </div>

        <div class="form-group row" v-if="false">
            <label for="brand" class="col-12 col-md-3 col-lg-2 col-form-label">* סוג:</label>
            <div class="col-12 col-md-9 col-lg-6">
                <select id="brand" class="form-control" v-model="type" required>
                    <option v-for="option in typeOptions" :value="option" :selected="option == type">@{{ option }}</option>
                </select>
            </div>
        </div>

        <div class="form-group row">
            <label for="brand" class="col-12 col-md-3 col-lg-2 col-form-label">* משפחה:</label>
            <div class="col-12 col-md-9 col-lg-6">
                <select id="brand" class="form-control" v-model="brand" required>
                    <option v-for="option in brandOptions" :value="option" :selected="option == brand">@{{ option }}</option>
                </select>
            </div>
        </div>

        <div class="form-group row">
            <label for="product" class="col-12 col-md-3 col-lg-2 col-form-label">* מוצר:</label>
            <div class="col-12 col-md-9 col-lg-6">
                <select id="product" class="form-control" v-model="product" required>
                    <option v-for="option in productOptions" :value="option.value" :selected="option == product">@{{ option.title }}</option>
                </select>
            </div>
        </div>

        <div class="form-group row">
            <label for="serial" class="col-12 col-md-3 col-lg-2 col-form-label">מספר סידורי:</label>
            <div class="col-12 col-md-9 col-lg-6 input-group">
                <input type="text" class="form-control" id="serial" v-model="serial" data-toggle="popover" data-placement="top">
                <div class="input-group-append">
                    <button type="button" class="btn btn-default js-serial-toogle" aria-label="Help">
                        <span class="far fa-question-circle"></span>
                    </button>
                </div>
            </div>
        </div>

        <div class="form-group row">
            <label for="date" class="col-12 col-md-3 col-lg-2 col-form-label">* תאריך רכישה:</label>
            <div class="col-12 col-md-9 col-lg-6">
                <date-picker :lang="lang" v-model="date"></date-picker>
                <div class="invalid-feedback">
                    אנא הזן תאריך רכישה:
                </div>
            </div>
        </div>
        <div class="form-group row">
            <label for="file" class="col-12 col-md-3 col-lg-2 col-form-label">* הכנסת חשבונית רכישה:</label>
            <div class="col-12 col-md-9 col-lg-6">
                <input type="file" class="form-control" v-on:change="checkFile($event)" id="file" accept=".jpg, .png">
            </div>
        </div>
        <button type="button" class="btn btn-primary" v-on:click="checkForm">שלח</button>
    </form>
@endsection

<script type="x-template" id="warranty-form">
    @yield('form')
</script>

@section("popover-template")
    <div class="popover" role="tooltip">
        <div class="arrow"></div>
        <h3 class="popover-header">
            המספר הסידורי נמצא בצד הפנימי של דלת הגריל:
        </h3>
        <div class="popover-body">
            <img src="images/serial.jpg" class="img-fluid"/>
        </div>
    </div>
@endsection

<script type="x-template" id="popover-template">
    @yield('popover-template')
</script>