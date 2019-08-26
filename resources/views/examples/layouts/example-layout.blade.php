<!doctype html>
<html lang="">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>
    <script src="https://cdn.priority-software.com/upgrades/var/api/v1.5/priorityapp.nocache.js"></script>
    <title>Customer Entry</title>
    <style>
        .item {
            margin: 20px 10px 20px 10px;
        }

        input {
            width: 200px;
            height: 30px;
            font-size: 16px;
        }

        label {
            font-size: 16px;
            display: inline-block;
            width: 150px;
        }
    </style>
</head>
<body>
@yield('content')
@yield('scripts')
</body>
</html>