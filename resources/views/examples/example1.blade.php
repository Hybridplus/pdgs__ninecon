@extends('examples.layouts.example-layout')

@section('content')
<div id="container" onchange="fieldChangeHandler(event)">
    <div class="item">
        <label class="labelStyle">Customer Number</label>
        <input id="CUSTNAME">
        <label class="labelStyle">CUSTNAME</label>
    </div>
    <div class="item">
        <label>Customer Name</label>
        <input id="CDES">
        <label class="labelStyle">CDES</label>
    </div>
    <div class="item">
        <label>תאריך רכישה</label>
        <input id="SBD_PURDATE">
        <label class="labelStyle">SBD_PURDATE</label>
    </div>
    <div class="item">
        <label>אבחנת לק.</label>
        <input id="SYMCODE">
        <label class="labelStyle">SYMCODE</label>
    </div>
     <div class="item">
        <label>סוג קריאה</label>
        <input id="CALLTYPECODE">
        <label class="labelStyle">CALLTYPECODE</label>
    </div>
    <div>
        <button onclick="saveHandler()">Save</button>
    </div>
</div>
@endsection
@section('scripts')
<script>
    let token = document.head.querySelector('meta[name="csrf-token"]');
    const rawSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.send = function () {
        if(!this._hooked){
            this._hooked = true;
            this.setRequestHeader('X-CSRF-TOKEN', token.content);
        }
        rawSend.apply(this, arguments);
    };

    var fieldChangeHandler = function(event) {
        console.log("change detected to ", event.srcElement.id);
    };

    var myForm;

    var updateFields = function (result) {
        console.groupCollapsed('Update Fields Callback')
        console.info(result)
        console.groupEnd();
        return true;
    };

    var showMessage = function (message) {
        console.log("Show message", message);
        message.form.warningConfirm(1);
        // if (message.type != "warning") {
        //     alert(message.message);
        // } else {
        //     if (confirm(message.message)) {
        //         message.form.warningConfirm(1);
        //     } else {
        //         message.form.warningConfirm(0);
        //     }
        // }
    };

    var fieldChangeHandler = function (event) {
        myForm.fieldUpdate(event.srcElement.id, event.target.value);
    };

    var priorityReady = function () {
        login({
            url: '/proxy?url=https://9-cp-test.wee.co.il/',
            tabulaini:"tabula.ini",
            language:1,
            company: 'ninecon',
            username:"service03",
            password: "galil1234",
        })
            .then(function () {
                return formStart('DOCUMENTS_Q', showMessage, updateFields);
            })
            .then(function (form) {
                myForm = form;
        });
    };

    var saveHandler = function () {
        myForm.saveRow(0);
    };
</script>
@endsection