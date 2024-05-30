import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Skeleton,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { type FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useGetGenresQuery, useGetKeywordsQuery } from '../../services/tmdbApi';
import { Filters } from '../../types/types';
import useDebounce from '../../hooks/useDebounce';

type MoviesFilterProps = {
  onApply(filters: Filters): void;
};

export const MoviesFilter: FC<MoviesFilterProps> = ({ onApply }) => {
  const { control, handleSubmit, formState } = useForm<Filters>({
    defaultValues: {
      keywords: [],
      genres: [],
    },
  });

  const { debouncedValue, debounceInputValue } = useDebounce();

  const { data: keywordsOptions = [], isLoading: keywordsLoading } =
    useGetKeywordsQuery(debouncedValue, { skip: !debouncedValue });
  const { data: genres, isLoading: genresLoading } = useGetGenresQuery();

  return (
    <Paper sx={{ p: 0.5, width: { xs: '100%', md: '250px' } }}>
      <form onSubmit={handleSubmit(onApply)}>
        <FormControl
          sx={{ m: 2, display: 'block' }}
          component="fieldset"
          variant="standard"
        >
          <Controller
            name="keywords"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                size="small"
                multiple
                loading={keywordsLoading}
                disablePortal
                options={keywordsOptions}
                filterOptions={(x) => x}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => onChange(value)}
                value={value}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onInputChange={(_, value) => debounceInputValue(value)}
                renderInput={(params) => (
                  <TextField {...params} label="Keywords" />
                )}
              />
            )}
          />
        </FormControl>
        <FormControl
          sx={{ m: 2, display: 'block' }}
          component="fieldset"
          variant="standard"
          size="small"
        >
          {genresLoading ? (
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{ width: '100%', height: '48px' }}
            />
          ) : (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <FormLabel component="legend">Genres</FormLabel>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup
                  sx={{
                    flexDirection: { xs: 'row', md: 'column' },
                    columnGap: 0.5,
                  }}
                >
                  <Controller
                    name="genres"
                    control={control}
                    render={({ field }) => (
                      <>
                        {genres?.map((genre) => (
                          <FormControlLabel
                            key={genre.id}
                            control={
                              <Checkbox
                                id={genre.id.toString()}
                                size="small"
                                value={genre.id}
                                checked={field.value.includes(genre.id)}
                                onChange={(event, checked) => {
                                  const valueNumber = Number(
                                    event.target.value,
                                  );
                                  if (checked) {
                                    field.onChange([
                                      ...field.value,
                                      valueNumber,
                                    ]);
                                  } else {
                                    field.onChange(
                                      field.value.filter(
                                        (value) => value !== valueNumber,
                                      ),
                                    );
                                  }
                                }}
                              />
                            }
                            label={genre.name}
                          />
                        ))}
                      </>
                    )}
                  />
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          )}
        </FormControl>
        <Button
          type="submit"
          size="small"
          sx={{ m: 2 }}
          variant="contained"
          startIcon={<FilterAltOutlinedIcon />}
          disabled={!formState.isDirty}
        >
          Apply filter
        </Button>
      </form>
    </Paper>
  );
};
