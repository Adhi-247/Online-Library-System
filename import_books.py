import csv
import psycopg2
from datetime import datetime

# Database connection details
DB_CONFIG = {
    'dbname': 'librarydb',
    'user': 'postgres',
    'password': '1234',  # Update if different
    'host': 'localhost',
    'port': '5432'
}

def parse_date(date_str):
    """Parse various date formats to PostgreSQL date"""
    if not date_str or date_str.strip() == '':
        return None
    
    try:
        # Try YYYY-MM-DD format
        return datetime.strptime(date_str, '%Y-%m-%d').date()
    except:
        try:
            # Try YYYY format
            return datetime.strptime(date_str, '%Y').date()
        except:
            return None

def import_books():
    conn = None
    try:
        # Connect to database
        print("Connecting to database...")
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()
        
        # Read CSV file
        print("Reading books.csv...")
        with open('books.csv', 'r', encoding='utf-8') as file:
            csv_reader = csv.DictReader(file)
            
            books_imported = 0
            errors = 0
            
            for row in csv_reader:
                try:
                    # Parse date
                    publish_date = parse_date(row['publishdate'])
                    
                    # Prepare values
                    title = row['title']
                    author = row['author']
                    isbn = row['isbn'] if row['isbn'] else None
                    description = row['description']
                    coverimage = row['coverimage']
                    pages = int(row['pages']) if row['pages'] else 0
                    available = int(row['available'])
                    categoryid = int(row['categoryid'])
                    publisher = row['publisher']
                    totalcopies = int(row['totalcopies'])
                    
                    # Insert into database
                    cursor.execute("""
                        INSERT INTO "Books" 
                        ("Title", "Author", "Isbn", "Description", "CoverImage", 
                         "PublishDate", "Pages", "Available", "CategoryId", "Publisher", "TotalCopies")
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """, (title, author, isbn, description, coverimage, publish_date, 
                          pages, available, categoryid, publisher, totalcopies))
                    
                    books_imported += 1
                    if books_imported % 10 == 0:
                        print(f"Imported {books_imported} books...")
                    
                except Exception as e:
                    errors += 1
                    print(f"Error importing book '{row.get('title', 'Unknown')}': {e}")
            
            # Commit transaction
            conn.commit()
            print(f"\n✓ Successfully imported {books_imported} books!")
            if errors > 0:
                print(f"✗ Failed to import {errors} books")
            
    except Exception as e:
        print(f"Database error: {e}")
        if conn:
            conn.rollback()
    finally:
        if conn:
            cursor.close()
            conn.close()
            print("Database connection closed.")

if __name__ == "__main__":
    import_books()
