<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

//use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber 
{
    public function updateJwtData(JWTCreatedEvent $event)
    {
      //1 Récupère l'utilisateur (pour avoir son firstName et lastName)
      $user = $event->getUser();
      //$user = $event->getData();
      //2 Enrichir les data pour qu'elles contiennet  ces données
      $data = $event->getData();
      $data['firstName'] = $user->getFirstName();
      $data['lastName'] = $user->getLastName();

      $event->setData($data);
       
    }

}

