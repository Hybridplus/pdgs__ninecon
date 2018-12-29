@extends('layouts.layout')

@section('content')
    <div  id="app" class="flex-center position-ref full-height">
        <div class="container">
            <div class="row">
                <div class="col text-right">
                    <h2 class="border-bottom border-success">טופס פתיחת קריאת שרות לגרילים</h2>
                    <ninecon-form></ninecon-form>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('form')
    <form @submit="checkForm" class="form-rtl" novalidate="true">
        <div class="form-group row">
            <label class="col-12 col-form-label font-weight-bold">פרטי לקוח:</label>
        </div>
        <div class="form-group row">
            <label for="fullName" class="col-12 col-md-3 col-lg-2 col-form-label">* שם מלא:</label>
            <div class="col-12 col-md-9 col-lg-10">
                <input type="text" class="form-control" id="fullName" v-model="fullName" required>
                <div class="invalid-feedback">
                    אנא הזן שם מלא:
                </div>
            </div>
        </div>
        <div class="form-group row">
            <label for="address" class="col-12 col-md-3 col-lg-2 col-form-label">כתובת:</label>
            <div class="col-12 col-md-9 col-lg-10">
                <input type="text" class="form-control" id="address" v-model="address">
            </div>
        </div>
        <div class="form-group row">
            <label for="phoneHome" class="col-12 col-md-3 col-lg-2 col-form-label">טלפון בית:</label>
            <div class="col-12 col-md-9 col-lg-10">
                <input type="tel" class="form-control" id="phoneHome" v-model="phoneHome">
            </div>
        </div>
        <div class="form-group row">
            <label for="phoneMobile" class="col-12 col-md-3 col-lg-2 col-form-label">טלפון נייד:</label>
            <div class="col-12 col-md-9 col-lg-10">
                <input type="tel" class="form-control" id="phoneMobile" v-model="phoneMobile">
            </div>
        </div>
        <div class="form-group row">
            <label for="email" class="col-12 col-md-3 col-lg-2 col-form-label">* דואר אלקטרוני:</label>
            <div class="col-12 col-md-9 col-lg-10">
                <input type="email" class="form-control" id="email" v-model="email" required>
                <div class="invalid-feedback">
                    אנא הזן דואר אלקטרוני:
                </div>
            </div>
        </div>

        <div class="form-group row">
            <label class="col-12 col-form-label font-weight-bold">פרטי המוצר:</label>
        </div>

        <div class="form-group row">
            <label for="brand" class="col-12 col-md-3 col-lg-2 col-form-label">* משפחה:</label>
            <div class="col-12 col-md-9 col-lg-10">
                <select id="brand" class="form-control" v-model="brand" required>
                    <option v-for="option in brandOptions" :value="option" :selected="option == brand">@{{ option }}</option>
                </select>
            </div>
        </div>

        <div class="form-group row">
            <label for="product" class="col-12 col-md-3 col-lg-2 col-form-label">* מוצר:</label>
            <div class="col-12 col-md-9 col-lg-10">
                <select id="product" class="form-control" v-model="product" required>
                    <option v-for="option in productOptions" :value="option" :selected="option == product">@{{ option }}</option>
                </select>
            </div>
        </div>

        <div class="form-group row">
            <label for="date" class="col-12 col-md-3 col-lg-2 col-form-label">* תאריך רכישה:</label>
            <div class="col-12 col-md-9 col-lg-10">
                <input type="date" class="form-control" id="date" v-model="date" required>
                <div class="invalid-feedback">
                    אנא הזן תאריך רכישה:
                </div>
            </div>
        </div>
        <div class="form-group row">
            <label for="place" class="col-12 col-md-3 col-lg-2 col-form-label">* מקום רכישה:</label>
            <div class="col-12 col-md-9 col-lg-10">
                <input type="text" class="form-control" id="place" v-model="place" required>
                <div class="invalid-feedback">
                    אנא הזן מקום רכישה:
                </div>
            </div>
        </div>
        <div class="form-group row">
            <label for="file" class="col-12 col-md-3 col-lg-2 col-form-label">* הכנסת חשבונית רכישה:</label>
            <div class="col-12 col-md-9 col-lg-10">
                <label for="file" class="text-success">טען קובץ</label>
                <input type="file" class="form-control d-none" id="file" required>
            </div>
        </div>
        <div class="form-group row">
            <label for="freetext" class="col-12 col-md-3 col-lg-2 col-form-label">* הסבר על התקלה:</label>
            <div class="col-12 col-md-9 col-lg-10">
                <textarea class="form-control" id="freetext" v-model="freetext" required></textarea>
                <div class="invalid-feedback">
                    אנא הזן הסבר על התקלה:
                </div>
            </div>
        </div>
        <div class="form-group row">
            <label for="hours" class="col-12 col-md-3 col-lg-2 col-form-label">מקום רכישה:</label>
            <div class="col-12 col-md-9 col-lg-10">
                <input type="text" class="form-control" id="hours" v-model="hours">
            </div>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
@endsection

<script type="x-template" id="ninecon-form">
    @yield('form')
</script>