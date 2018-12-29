<?php
/**
 * Created by PhpStorm.
 * User: andrew
 * Date: 12/29/18
 * Time: 4:09 PM
 */

namespace App\Http\Controllers;


use Illuminate\Http\Request;

class NineconController extends Controller
{
    public function actionSubmitForm(Request $request){
        return response()->redirectTo('/finish');
    }
}