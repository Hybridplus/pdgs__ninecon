<?php
/**
 * Created by PhpStorm.
 * User: andrew
 * Date: 3/6/19
 * Time: 11:00 AM
 */

namespace App\Override;



use Proxy\Exception\UnexpectedValueException;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;
use Relay\RelayBuilder;
use Zend\Diactoros\Response;
use Zend\Diactoros\Uri;

class Proxy extends \Proxy\Proxy
{
    public function to($target)
    {
        if ($this->request === null) {
            throw new UnexpectedValueException('Missing request instance.');
        }

        $target = new Uri($target);

        // Overwrite target scheme and host.
        $uri = $this->request->getUri()
            ->withScheme($target->getScheme())
            ->withHost($target->getHost());

        // Check for custom port.
        if ($port = $target->getPort()) {
            $uri = $uri->withPort($port);
        }

        // Check for subdirectory.
        if ($path = $target->getPath()) {
            $uri = $uri->withPath(rtrim($path, '/'));// . '/' . ltrim($uri->getPath(), '/'));
        }

        $request = $this->request->withUri($uri);

        $stack = $this->filters;

        $stack[] = function (RequestInterface $request, ResponseInterface $response, callable $next) {
            $response = $this->adapter->send($request);

            return $next($request, $response);
        };

        $relay = (new RelayBuilder())->newInstance($stack);

        return $relay($request, new Response());
    }


}