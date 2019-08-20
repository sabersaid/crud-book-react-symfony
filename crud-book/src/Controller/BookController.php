<?php
namespace App\Controller;
use App\Entity\Book;
use App\Repository\BookRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
class BookController extends ApiController
{
    /**
    * @Route("/books", methods="GET")
    */
    public function index(BookRepository $bookRepository)
    {
       
        $books = $bookRepository->transformAll();
        return $this->respond($books);
    }
    /**
    * @Route("/books", methods="POST")
    */
    public function create(Request $request, BookRepository $bookRepository, EntityManagerInterface $em)
    {
      
        $request = $this->transformJsonBody($request);
        if (! $request) {
            return $this->respondValidationError('Please provide a valid request!');
        }
        // validate the title
        if (! $request->get('title')) {
            return $this->respondValidationError('Please provide a title!');
        }
        // persist the new book
        $book = new Book;
        $book->setTitle($request->get('title'));
        $book->setCount(0);
        $em->persist($book);
        $em->flush();
        return $this->respondCreated($bookRepository->transform($book));
    }
    /**
    * @Route("/books/{id}/count", methods="POST")
    */
    public function increaseCount($id, EntityManagerInterface $em, BookRepository $bookRepository)
    {
        
        $book = $bookRepository->find($id);
        if (! $book) {
            return $this->respondNotFound();
        }
        $book->setCount($book->getCount() + 1);
        $em->persist($book);
        $em->flush();
        return $this->respond([
            'count' => $book->getCount()
        ]);
    }
}