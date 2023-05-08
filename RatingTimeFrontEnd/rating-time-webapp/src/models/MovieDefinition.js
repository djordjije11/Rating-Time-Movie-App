export default class MovieDefinition {
  constructor(id,title, imageUrl, rating, overview, averageVote, genreIds) {
    this.id= id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.rating = rating;
    this.overview = overview;
    this.averageVote = averageVote;
    this.genreIds=genreIds;
  }
}
