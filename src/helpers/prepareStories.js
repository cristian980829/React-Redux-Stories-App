import moment from 'moment';

export const prepareStories = ( stories = [] ) => {
    return stories.map(
        (e) => ({
            ...e,
            registration_date: moment( e.registration_date ).toDate(),
        })
    );
}
