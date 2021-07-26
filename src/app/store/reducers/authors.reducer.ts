import { IAuthor } from 'src/app/courses/courses-page/courses-page-items-list/courses-page-item/courses-page-item.model';
import { ActionTypes, AllAuthorsStates } from '../actions/authors.actions';

export interface AuthorsState {
  allAuthorsLoaded: boolean;
  data: IAuthor[] | Partial<IAuthor[]> | null;
}

export const initialState: AuthorsState = {
  allAuthorsLoaded: false,
  data: null,
};

export const authorsReducer = (
  state = initialState,
  action: AllAuthorsStates
) => {
  switch (action.type) {
    case ActionTypes.getAuthors:
      return {
        allAuthorsLoaded: true,
        data: action.payload,
      };
    default:
      return state;
  }
};
