import { CloseRounded } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  CircularProgress,
  Fade,
  IconButton,
  Paper,
  Popper,
  Typography,
} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import { useRef, type FC } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { useSearchMoviesQuery } from '../../services/tmdbApi';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: '20px',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 5),
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export const SearchField: FC = () => {
  const { debouncedValue, debounceInputValue } = useDebounce();

  const anchorElRef = useRef<HTMLDivElement | null>(null);

  const { data: searchedMovies, isFetching } = useSearchMoviesQuery({
    page: 1,
    query: debouncedValue,
  });

  return (
    <Search ref={anchorElRef}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => debounceInputValue(e.target.value)}
      />
      <SearchIconWrapper right={0} top={0}>
        {(debouncedValue || searchedMovies?.results.length) && !isFetching ? (
          <IconButton
            size="small"
            aria-label="clear search"
            onClick={() => debounceInputValue('')}
            edge="end"
          >
            <CloseRounded
              sx={{
                color: (theme) => theme.palette.primary.contrastText,
              }}
            />
          </IconButton>
        ) : null}

        {debouncedValue && isFetching && (
          <CircularProgress
            size={20}
            sx={{
              color: (theme) => theme.palette.primary.contrastText,
            }}
          />
        )}
      </SearchIconWrapper>
      <Popper
        sx={{ zIndex: 1200 }}
        open={
          (!!debouncedValue || !!searchedMovies?.results.length) && !isFetching
        }
        placement="bottom"
        anchorEl={anchorElRef.current}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Paper>
              {searchedMovies?.results.map((m) => (
                <Typography sx={{ p: 2 }}>{m.title}</Typography>
              ))}
            </Paper>
          </Fade>
        )}
      </Popper>
    </Search>
  );
};
