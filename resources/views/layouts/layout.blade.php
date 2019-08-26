<html lang="{{ app()->getLocale() }}">
    @include('layouts.head')
    <body>
        @include('layouts.header')
        @yield('content')
        @include('layouts.footer')
        <div class="modal fade bd-example-modal-lg" data-backdrop="static" data-keyboard="false" tabindex="-1">
            <div class="modal-dialog modal-sm">
                <div class="modal-content" style="width: 48px; margin: 0 auto;">
                    <span class="fa fa-spinner fa-spin fa-3x"></span>
                </div>
                <div class="modal-footer" style="border: 0; direction: rtl; font-size: 1.2rem; text-align: center; font-weight: bold;">
                    <p>
                        נא להמתין...
                    </p>
                </div>
            </div>
        </div>
        <script>
            var priorityReady = function () {
                window.isPriorityReady = true;
                $('body').trigger('loginReady')
            }
            var baseUrl = '{{route('index')}}';
        </script>
    </body>
</html>
