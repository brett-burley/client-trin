import ErrorState from '../../context/error/ErrorState';
import LibraryState from '../../context/library/LibraryState';
import ModeState from '../../context/mode/ModeState';
import BookState from '../../context/book/BookState';

export default function AllStates({ children })
{
  return (
    <ErrorState>
      <LibraryState>
        <ModeState>
          <BookState>
            {children}
          </BookState>
        </ModeState>
      </LibraryState>
    </ErrorState>
  );
}
