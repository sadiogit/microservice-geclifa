<?php

namespace App\Events;

use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;

use Symfony\Component\HttpKernel\Event\ViewEvent;

class InvoiceChronoSuscriber implements EventSubscriberInterface
{
    private $security;
    private $repository;

    public function __construct(Security $security, InvoiceRepository $repository)
    {
        $this->security = $security;
        $this->repository = $repository;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setChronoForInvoice', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setChronoForInvoice(ViewEvent $event)
    {
        $invoice = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if($invoice instanceof Invoice && $method === "POST"){
            $nextChrono = $this->repository->findNextChrono($this->security->getUser());
            //$nextChrono1 = $nextChrono + 1;  
            $invoice->setChrono($nextChrono);
          
            if(empty($invoice->getSentAt())){
                $invoice->setSentAt(new \DateTime());
                //dd($invoice);
            }
        }
    }
}