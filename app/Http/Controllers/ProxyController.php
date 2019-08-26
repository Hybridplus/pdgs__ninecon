<?php
/**
 * Created by PhpStorm.
 * User: andrew
 * Date: 1/3/19
 * Time: 1:56 AM
 */

namespace App\Http\Controllers;


//use App\Override\Proxy;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Proxy\Adapter\Guzzle\GuzzleAdapter;
use Proxy\Filter\RemoveEncodingFilter;
use Proxy\Proxy;
use Zend\Diactoros\Response\SapiEmitter;
use Zend\Diactoros\ServerRequestFactory;
use Zend\Diactoros\Uri;

class ProxyController extends Controller
{

    public function actionProxy(Request $request){
        $url = $request->input('url');
//        $url = "https://9-cp.wee.co.il";

        // Create a PSR7 request based on the current browser request.
        $r = ServerRequestFactory::fromGlobals();

//        $reflection = new \ReflectionClass($r->getUri());
//        $property = $reflection->getProperty('path');
//        $property->setAccessible(true);
//        $property->setValue($r->getUri(), "");
//        $property = $reflection->getProperty('query');
//        $property->setAccessible(true);
//        $property->setValue($r->getUri(), "");

        // Create a guzzle client
        $guzzle = new Client();

        // Create the proxy instance
        $proxy = new Proxy(new GuzzleAdapter($guzzle));

        // Add a response filter that removes the encoding headers.
        $proxy->filter(new RemoveEncodingFilter());

        // Forward the request and get the response.
        $response = $proxy->forward($r)->to($url);

        (new SapiEmitter())->emit($response);
    }
}