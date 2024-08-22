import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';
import { useSearchParams } from 'react-router-dom';

const Paginated = ({
  slice, renderItem, page, pageCount,
}) => {
  const { value } = useSelector((state) => state[slice]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const handlePageClick = (event) => {
    setSearchParams((params) => params.set('page', event.target.textContent));
    navigate(`?${searchParams}`);
  };
  const pages = [];
  for (let number = 1; number <= pageCount; number += 1) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={handlePageClick}
      >
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <>
      <ListGroup>
        {value?.map((item) => renderItem(item))}
      </ListGroup>
      <Pagination className="mt-3 mb-0 d-flex justify-content-center">{pages}</Pagination>
    </>
  );
};

Paginated.propTypes = {
  slice: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
  pageCount: PropTypes.number.isRequired,
};

export default Paginated;
