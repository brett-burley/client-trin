import AlertState from '../../context/alert/AlertState';
import LibraryState from '../../context/library/LibraryState';
import ModeState from '../../context/mode/ModeState';
import BookState from '../../context/book/BookState';

export default function AllStates({ children })
{
  return (
    <AlertState>
      <LibraryState>
        <ModeState>
          <BookState>
            {children}
          </BookState>
        </ModeState>
      </LibraryState>
    </AlertState>
  );
}
