'use strict'
const Cinema = use('App/Models/Cinema');
const MovieShowing = use('App/Models/MovieShowing');
const moment = require('moment');

class MovieController {

  async byCinema({response, params}) {
    const cinema = await Cinema.find(params.id);
    await cinema.loadMany({
      movie_showings: (movie_showing)=>{
        movie_showing
          .select('id','moview_id', 'romm_id')
          .where('moview_show_date', moment(new Date()).format('YYYY-MM-DD'))
          .with('movie_showing_times', (moview_showing_time)=> {
            moview_showing_time.where('hour_to_show', '>=', new Date().getHours())
          })
          .with('movie', (movie) => {
            movie.with('genres', (genres) => {
              genres.select('genre_name')
            })
          })
          .with('room')
      }
    })

    return response.json(cinema);
  }

  async byMovie({response, params}) {
    const movie = await MovieShowing.find('movie_id', params.movieId);
    await movie.loadMany({
      movie_showing_times : (movie_showing_times) => {
        movie_showing_times
        .where('hour_to_show', '>=', new Date().getHours())
        .with('bookings', (bookings) => {
          bookings.with('seats')
        })
      },
      movie: (movie)=>{
        movie.with('genres', (genres) => {
          genres.select('genre_name')
        })
      },
      room:null
    });
    return response.json(movie);

  }
}

module.exports = MovieController
