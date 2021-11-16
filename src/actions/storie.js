import { fetchConToken } from "../helpers/fetch";
import { prepareStories } from "../helpers/prepareStories";
import { types } from "../types/types";

export const storieLogout =() => ({ type: types.storieLogout });

export const storieStartLoading = () => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchConToken( 'stories' );
            const body = await resp.json();
            
            const stories = prepareStories( body.stories );

            dispatch( storieLoaded( stories ) );

        } catch (error) {
            console.log(error)
        }

    }
}

const storieLoaded = (stories) => ({
    type: types.storieLoaded,
    payload: stories
})