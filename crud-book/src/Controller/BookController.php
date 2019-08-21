<?php
namespace App\Controller;
use App\Entity\Book;
use App\Repository\BookRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
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
    * @Route("/createbook", methods="POST")
    */
    public function create(Request $request, BookRepository $bookRepository, EntityManagerInterface $em)
    {
		$formdata = json_decode($request->getContent());
		
        // persist the new book
        $book = new Book;
        $book->setName($formdata->name);
        $book->setIsbn($formdata->isbn);
		$book->setPrice($formdata->price);
		$book->setAvailability($formdata->availability);
		$book->setAuthor($formdata->author);
        $em->persist($book);
        $em->flush();
        
		
		$response = array('message' => 'Book created successfully!');
		return new JsonResponse ($response);
    }
	
	    /**
    * @Route("/editbook", methods="POST")
    */
    public function edit(Request $request, BookRepository $bookRepository, EntityManagerInterface $em)
    {
		$formdata = json_decode($request->getContent());
		$book = $bookRepository->find($formdata->id);
		
        // persist the new book
        $book->setName($formdata->name);
        $book->setIsbn($formdata->isbn);
		$book->setPrice($formdata->price);
		$book->setAvailability($formdata->availability);
		$book->setAuthor($formdata->author);
        $em->persist($book);
        $em->flush();
        
		
		$response = array('message' => 'Book created successfully!');
		return new JsonResponse ($response);
    }
 
		
    /**
     * @Route("/book/delete", name="book_delete")
     */
    public function deleteAction(Request $request, BookRepository $bookRepository, EntityManagerInterface $em)
    {
		//return new JsonResponse($request->get('bookId'));

	
        $book = $bookRepository->find($request->get('bookId'));
        $em->remove($book);
        $em->flush();
		
		$response = array('message' => 'Book deleted successfully!');
		return new JsonResponse ($response);
        
        
    }
	
	 /**
     * @Route("/book/getbook", name="book_get")
     */
    public function getBookAction(Request $request, BookRepository $bookRepository, EntityManagerInterface $em)
    {
		//return new JsonResponse($request->get('bookId'));

	
        $book = $bookRepository->find($request->get('bookId'));
		$book = $bookRepository->transform($book);

		
		return new JsonResponse ($book);
        
        
    }
}