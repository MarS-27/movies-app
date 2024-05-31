import { CloseRounded } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  CircularProgress,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Popper,
  Typography,
} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import { useEffect, useRef, useState, type FC } from 'react';
import useDebounce from '../../hooks/useDebounce';
import {
  useGetConfigurationQuery,
  useSearchMoviesQuery,
} from '../../services/tmdbApi';
import { Link as RouterLink } from 'react-router-dom';
import { formatImageUrl } from '../../utils/formatImageUrl';
import { WarningMessage } from './WarningMessage';

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
  const [pageNum, setPageNum] = useState(1);
  const { debouncedValue, debounceInputValue } = useDebounce();
  const { data: configuration } = useGetConfigurationQuery();

  const anchorElRef = useRef<HTMLDivElement | null>(null);

  const { data, isFetching, isLoading } = useSearchMoviesQuery({
    page: pageNum,
    query: debouncedValue,
  });

  const searchedMovies = data?.results;
  const hasMorePages = data?.hasMorePages;

  useEffect(() => {
    setPageNum(1);
  }, [debouncedValue]);

  console.log(pageNum);

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
        {(debouncedValue || searchedMovies?.length) && !isFetching ? (
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
        sx={{
          p: 1,
          zIndex: 1200,
        }}
        open={(!!debouncedValue || !!searchedMovies?.length) && !isLoading}
        placement="bottom"
        anchorEl={anchorElRef.current}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Paper
              sx={{
                p: 1,
                minWidth: '320px',
                width: { xs: '95vw', sm: '50vw' },
                maxHeight: '300px',
                overflow: 'auto',
              }}
            >
              <List disablePadding>
                {!searchedMovies?.length && !isFetching && (
                  <WarningMessage message="No movies were found that match your query." />
                )}

                {searchedMovies?.length && (
                  <>
                    {searchedMovies.map((m) => (
                      <ListItem
                        key={m.id}
                        component={RouterLink}
                        to={`/movie/${m.id}`}
                        disablePadding
                        sx={{
                          color: (theme) => theme.palette.text.primary,
                        }}
                      >
                        <ListItemButton divider>
                          <img
                            style={{
                              width: '120px',
                              height: 'auto',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              marginRight: '16px',
                            }}
                            src={formatImageUrl(m.backdrop_path, configuration)}
                            alt={m.title}
                          />
                          <Typography>{m.title}</Typography>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </>
                )}
              </List>
              {hasMorePages && (
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ marginTop: 1, width: '100%' }}
                  onClick={() => setPageNum((q) => q + 1)}
                >
                  More results
                </Button>
              )}
            </Paper>
          </Fade>
        )}
      </Popper>
    </Search>
  );
};
