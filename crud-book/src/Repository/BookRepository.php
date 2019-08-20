<?php
namespace App\Repository;
use App\Entity\Book;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
/**
 * @method Book|null find($id, $lockMode = null, $lockVersion = null)
 * @method Book|null findOneBy(array $criteria, array $orderBy = null)
 * @method Book[]    findAll()
 * @method Book[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BookRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Book::class);
    }
//    /**
//     * @return Book[] Returns an array of Book objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */
    /*
    public function findOneBySomeField($value): ?Book
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
    public function transform(Book $book)
    {
        return [
                'id'    => (int) $book->getId(),
                'name' => (string) $book->getName(),
                'isbn' => (int) $book->getIsbn(),
				'price' => (int) $book->getPrice(),
				'availability' => (boolean) $book->getAvailability(),
				'author' => (string) $book->getAuthor(),



				
        ];
    }
    public function transformAll()
    {
        $books = $this->findAll();
        $booksArray = [];
        foreach ($books as $book) {
            $booksArray[] = $this->transform($book);
        }
        return $booksArray;
    }
}