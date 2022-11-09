import type { FC, JSXElementConstructor, CSSProperties } from 'react';
import { useCallback, useRef } from 'react';
import { getPageRef, scrollToPage, handleMouseWheelScroll } from '@/lib/utils';
import Button from './components/Button';
import Pages from './components/Pages';
import './index.css';

export type Props = {
  currentPageNumber: number;
  numberOfPages: number;
  onPageChange: (pageNumber: number, pageRef: HTMLSpanElement | undefined) => void;
  paginationContainerClass?: string;
  pagesContainerClass?: string;
  nextLabel?: string | JSXElementConstructor<Record<string, never>>;
  prevLabel?: string | JSXElementConstructor<Record<string, never>>;
  nextBtnClass?: string;
  prevBtnClass?: string;
  pageStyle?: CSSProperties;
  pageClass?: string;
  activePageStyle?: CSSProperties;
  activePageClass?: string;
};

const Pagination: FC<Props> = (props) => {
  const {
    currentPageNumber,
    numberOfPages,
    pageStyle,
    activePageStyle,
    pageClass = 'page',
    activePageClass = 'active-page',
    paginationContainerClass = 'pagination',
    pagesContainerClass = 'pages',
    nextBtnClass = 'btn',
    prevBtnClass = 'btn',
    onPageChange,
    prevLabel = '❮',
    nextLabel = '❯',
  } = props;

  const pagesRef = useRef<HTMLDivElement>(null);

  const handlePageChange = useCallback((pageNumber: number): void => {
    const pageRef = getPageRef(pagesRef, pageNumber);

    onPageChange(pageNumber, pageRef);
    scrollToPage(pagesRef, pageNumber);
  }, []);

  return (
    <div className={paginationContainerClass} onWheel={handleMouseWheelScroll} role='pagination'>
      <Button
        Label={prevLabel}
        className={prevBtnClass}
        onClick={handlePageChange.bind(null, currentPageNumber - 1)}
      />

      <Pages
        ref={pagesRef}
        currentPageNumber={currentPageNumber}
        numberOfPages={numberOfPages}
        pageStyle={pageStyle}
        activePageStyle={activePageStyle}
        pageClass={pageClass}
        activePageClass={activePageClass}
        handlePageChange={handlePageChange}
        pagesContainerClass={pagesContainerClass}
      />

      <Button
        Label={nextLabel}
        className={nextBtnClass}
        onClick={handlePageChange.bind(null, currentPageNumber + 1)}
      />
    </div>
  );
};

export default Pagination;
