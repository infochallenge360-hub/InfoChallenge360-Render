// "Guess the Book by Opening Line" — 70 real books, each with a verbatim
// opening-line excerpt (word-for-word from the published text; several of
// the longest true first sentences are trimmed to a natural clause boundary
// so the card can hold them, not paraphrased). name = title, spoken/shown at
// reveal. openingLine = the on-screen clue text (plays the role the photo/
// pictogram plays in other episodes).
export const BOOKS_E89 = [
  // EASY (18)
  { slug: "pride-and-prejudice", name: "Pride and Prejudice", author: "Jane Austen", year: 1813, openingLine: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.", level: "easy" },
  { slug: "a-tale-of-two-cities", name: "A Tale of Two Cities", author: "Charles Dickens", year: 1859, openingLine: "It was the best of times, it was the worst of times.", level: "easy" },
  { slug: "moby-dick", name: "Moby-Dick", author: "Herman Melville", year: 1851, openingLine: "Call me Ishmael.", level: "easy" },
  { slug: "1984", name: "1984", author: "George Orwell", year: 1949, openingLine: "It was a bright cold day in April, and the clocks were striking thirteen.", level: "easy" },
  { slug: "harry-potter-and-the-sorcerers-stone", name: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", year: 1997, openingLine: "Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much.", level: "easy" },
  { slug: "the-hobbit", name: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, openingLine: "In a hole in the ground there lived a hobbit.", level: "easy" },
  { slug: "anna-karenina", name: "Anna Karenina", author: "Leo Tolstoy", year: 1878, openingLine: "Happy families are all alike; every unhappy family is unhappy in its own way.", level: "easy" },
  { slug: "alices-adventures-in-wonderland", name: "Alice's Adventures in Wonderland", author: "Lewis Carroll", year: 1865, openingLine: "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do.", level: "easy" },
  { slug: "the-catcher-in-the-rye", name: "The Catcher in the Rye", author: "J.D. Salinger", year: 1951, openingLine: "If you really want to hear about it, the first thing you'll probably want to know is where I was born, and what my lousy childhood was like.", level: "easy" },
  { slug: "to-kill-a-mockingbird", name: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, openingLine: "When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow.", level: "easy" },
  { slug: "peter-pan", name: "Peter Pan", author: "J.M. Barrie", year: 1911, openingLine: "All children, except one, grow up.", level: "easy" },
  { slug: "frankenstein", name: "Frankenstein", author: "Mary Shelley", year: 1818, openingLine: "You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings.", level: "easy" },
  { slug: "the-great-gatsby", name: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, openingLine: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.", level: "easy" },
  { slug: "one-hundred-years-of-solitude", name: "One Hundred Years of Solitude", author: "Gabriel García Márquez", year: 1967, openingLine: "Many years later, as he faced the firing squad, Colonel Aureliano Buendía was to remember that distant afternoon when his father took him to discover ice.", level: "easy" },
  { slug: "the-lion-the-witch-and-the-wardrobe", name: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", year: 1950, openingLine: "Once there were four children whose names were Peter, Susan, Edmund and Lucy.", level: "easy" },
  { slug: "charlottes-web", name: "Charlotte's Web", author: "E.B. White", year: 1952, openingLine: "\"Where's Papa going with that ax?\" said Fern to her mother as they were setting the table for breakfast.", level: "easy" },
  { slug: "the-wonderful-wizard-of-oz", name: "The Wonderful Wizard of Oz", author: "L. Frank Baum", year: 1900, openingLine: "Dorothy lived in the midst of the great Kansas prairies, with Uncle Henry, who was a farmer, and Aunt Em, who was the farmer's wife.", level: "easy" },
  { slug: "a-christmas-carol", name: "A Christmas Carol", author: "Charles Dickens", year: 1843, openingLine: "Marley was dead: to begin with.", level: "easy" },

  // MEDIUM (18)
  { slug: "adventures-of-huckleberry-finn", name: "The Adventures of Huckleberry Finn", author: "Mark Twain", year: 1884, openingLine: "You don't know about me, without you have read a book by the name of The Adventures of Tom Sawyer; but that ain't no matter.", level: "medium" },
  { slug: "neuromancer", name: "Neuromancer", author: "William Gibson", year: 1984, openingLine: "The sky above the port was the color of television, tuned to a dead channel.", level: "medium" },
  { slug: "fahrenheit-451", name: "Fahrenheit 451", author: "Ray Bradbury", year: 1953, openingLine: "It was a pleasure to burn.", level: "medium" },
  { slug: "brave-new-world", name: "Brave New World", author: "Aldous Huxley", year: 1932, openingLine: "A squat grey building of only thirty-four stories.", level: "medium" },
  { slug: "the-handmaids-tale", name: "The Handmaid's Tale", author: "Margaret Atwood", year: 1985, openingLine: "We slept in what had once been the gymnasium.", level: "medium" },
  { slug: "the-metamorphosis", name: "The Metamorphosis", author: "Franz Kafka", year: 1915, openingLine: "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect.", level: "medium" },
  { slug: "rebecca", name: "Rebecca", author: "Daphne du Maurier", year: 1938, openingLine: "Last night I dreamt I went to Manderley again.", level: "medium" },
  { slug: "the-bell-jar", name: "The Bell Jar", author: "Sylvia Plath", year: 1963, openingLine: "It was a queer, sultry summer, the summer they electrocuted the Rosenbergs, and I didn't know what I was doing in New York.", level: "medium" },
  { slug: "slaughterhouse-five", name: "Slaughterhouse-Five", author: "Kurt Vonnegut", year: 1969, openingLine: "All this happened, more or less.", level: "medium" },
  { slug: "one-flew-over-the-cuckoos-nest", name: "One Flew Over the Cuckoo's Nest", author: "Ken Kesey", year: 1962, openingLine: "They're out there.", level: "medium" },
  { slug: "the-road", name: "The Road", author: "Cormac McCarthy", year: 2006, openingLine: "When he woke in the woods in the dark and the cold of the night he'd reach out to touch the child sleeping beside him.", level: "medium" },
  { slug: "beloved", name: "Beloved", author: "Toni Morrison", year: 1987, openingLine: "124 was spiteful.", level: "medium" },
  { slug: "the-kite-runner", name: "The Kite Runner", author: "Khaled Hosseini", year: 2003, openingLine: "I became what I am today at the age of twelve, on a frigid overcast day in the winter of 1975.", level: "medium" },
  { slug: "life-of-pi", name: "Life of Pi", author: "Yann Martel", year: 2001, openingLine: "My suffering left me sad and gloomy.", level: "medium" },
  { slug: "the-old-man-and-the-sea", name: "The Old Man and the Sea", author: "Ernest Hemingway", year: 1952, openingLine: "He was an old man who fished alone in a skiff in the Gulf Stream and he had gone eighty-four days now without taking a fish.", level: "medium" },
  { slug: "jane-eyre", name: "Jane Eyre", author: "Charlotte Brontë", year: 1847, openingLine: "There was no possibility of taking a walk that day.", level: "medium" },
  { slug: "wuthering-heights", name: "Wuthering Heights", author: "Emily Brontë", year: 1847, openingLine: "1801—I have just returned from a visit to my landlord—the solitary neighbour that I shall be troubled with.", level: "medium" },
  { slug: "great-expectations", name: "Great Expectations", author: "Charles Dickens", year: 1861, openingLine: "My father's family name being Pirrip, and my Christian name Philip, my infant tongue could make of both names nothing longer or more explicit than Pip.", level: "medium" },

  // HARD (16)
  { slug: "crime-and-punishment", name: "Crime and Punishment", author: "Fyodor Dostoevsky", year: 1866, openingLine: "On an exceptionally hot evening early in July a young man came out of the garret in which he lodged.", level: "hard" },
  { slug: "the-trial", name: "The Trial", author: "Franz Kafka", year: 1925, openingLine: "Someone must have been telling lies about Josef K., for without having done anything wrong he was arrested one fine morning.", level: "hard" },
  { slug: "a-room-with-a-view", name: "A Room with a View", author: "E.M. Forster", year: 1908, openingLine: "\"The Signora had no business to do it,\" said Miss Bartlett, \"no business at all.\"", level: "hard" },
  { slug: "to-the-lighthouse", name: "To the Lighthouse", author: "Virginia Woolf", year: 1927, openingLine: "Yes, of course, if it's fine tomorrow, said Mrs Ramsay.", level: "hard" },
  { slug: "the-sound-and-the-fury", name: "The Sound and the Fury", author: "William Faulkner", year: 1929, openingLine: "Through the fence, between the curling flower spaces, I could see them hitting.", level: "hard" },
  { slug: "ulysses", name: "Ulysses", author: "James Joyce", year: 1922, openingLine: "Stately, plump Buck Mulligan came from the stairhead, bearing a bowl of lather on which a mirror and a razor lay crossed.", level: "hard" },
  { slug: "gravitys-rainbow", name: "Gravity's Rainbow", author: "Thomas Pynchon", year: 1973, openingLine: "A screaming comes across the sky.", level: "hard" },
  { slug: "midnights-children", name: "Midnight's Children", author: "Salman Rushdie", year: 1981, openingLine: "I was born in the city of Bombay… once upon a time.", level: "hard" },
  { slug: "the-stranger", name: "The Stranger", author: "Albert Camus", year: 1942, openingLine: "Maman died today.", level: "hard" },
  { slug: "their-eyes-were-watching-god", name: "Their Eyes Were Watching God", author: "Zora Neale Hurston", year: 1937, openingLine: "Ships at a distance have every man's wish on board.", level: "hard" },
  { slug: "as-i-lay-dying", name: "As I Lay Dying", author: "William Faulkner", year: 1930, openingLine: "Jewel and I come up from the field, following the path in single file.", level: "hard" },
  { slug: "blood-meridian", name: "Blood Meridian", author: "Cormac McCarthy", year: 1985, openingLine: "See the child.", level: "hard" },
  { slug: "the-grapes-of-wrath", name: "The Grapes of Wrath", author: "John Steinbeck", year: 1939, openingLine: "To the red country and part of the gray country of Oklahoma, the last rains came gently, and they did not cut the scarred earth.", level: "hard" },
  { slug: "catch-22", name: "Catch-22", author: "Joseph Heller", year: 1961, openingLine: "It was love at first sight.", level: "hard" },
  { slug: "don-quixote", name: "Don Quixote", author: "Miguel de Cervantes", year: 1605, openingLine: "Somewhere in La Mancha, in a place whose name I do not care to remember, a gentleman lived not long ago.", level: "hard" },
  { slug: "the-brothers-karamazov", name: "The Brothers Karamazov", author: "Fyodor Dostoevsky", year: 1880, openingLine: "Alexey Fyodorovitch Karamazov was the third son of Fyodor Pavlovitch Karamazov, a landowner well known in our district in his own day.", level: "hard" },

  // IMPOSSIBLE (18)
  { slug: "finnegans-wake", name: "Finnegans Wake", author: "James Joyce", year: 1939, openingLine: "riverrun, past Eve and Adam's, from swerve of shore to bend of bay, brings us by a commodious vicus of recirculation back to Howth Castle and Environs.", level: "impossible" },
  { slug: "the-unbearable-lightness-of-being", name: "The Unbearable Lightness of Being", author: "Milan Kundera", year: 1984, openingLine: "The idea of the eternal return is a mysterious one, and Nietzsche has often perplexed other philosophers with it.", level: "impossible" },
  { slug: "under-the-volcano", name: "Under the Volcano", author: "Malcolm Lowry", year: 1947, openingLine: "Two mountain chains traverse the republic roughly from north to south, forming between them a number of valleys and plateaux.", level: "impossible" },
  { slug: "house-of-leaves", name: "House of Leaves", author: "Mark Z. Danielewski", year: 2000, openingLine: "This is not for you.", level: "impossible" },
  { slug: "the-waves", name: "The Waves", author: "Virginia Woolf", year: 1931, openingLine: "The sun had not yet risen. The sea was indistinguishable from the sky, except that the sea was slightly creased as if a cloth had wrinkles in it.", level: "impossible" },
  { slug: "absalom-absalom", name: "Absalom, Absalom!", author: "William Faulkner", year: 1936, openingLine: "From a little after two o'clock until almost sundown of the long still hot weary dead September afternoon they sat in what Miss Coldfield still called the office.", level: "impossible" },
  { slug: "naked-lunch", name: "Naked Lunch", author: "William S. Burroughs", year: 1959, openingLine: "I can feel the heat closing in, feel them out there making their moves, setting up their devil doll stool pigeons.", level: "impossible" },
  { slug: "the-confidence-man", name: "The Confidence-Man", author: "Herman Melville", year: 1857, openingLine: "At sunrise on a first of April, there appeared, suddenly as Manco Capac at the lake Titicaca, a man in cream-colors.", level: "impossible" },
  { slug: "pale-fire", name: "Pale Fire", author: "Vladimir Nabokov", year: 1962, openingLine: "I was the shadow of the waxwing slain by the false azure in the windowpane.", level: "impossible" },
  { slug: "a-clockwork-orange", name: "A Clockwork Orange", author: "Anthony Burgess", year: 1962, openingLine: "What's it going to be then, eh?", level: "impossible" },
  { slug: "the-sot-weed-factor", name: "The Sot-Weed Factor", author: "John Barth", year: 1960, openingLine: "In the last years of the seventeenth century there was to be found among the fops and fools of the London coffee-houses one rangy, gangling flitch called Ebenezer Cooke.", level: "impossible" },
  { slug: "foucaults-pendulum", name: "Foucault's Pendulum", author: "Umberto Eco", year: 1988, openingLine: "That was when I saw the Pendulum.", level: "impossible" },
  { slug: "the-man-without-qualities", name: "The Man Without Qualities", author: "Robert Musil", year: 1930, openingLine: "A barometric low hung over the Atlantic.", level: "impossible" },
  { slug: "tristram-shandy", name: "Tristram Shandy", author: "Laurence Sterne", year: 1759, openingLine: "I wish either my father or my mother, or indeed both of them, as they were in duty both equally bound to it, had minded what they were about when they begot me.", level: "impossible" },
  { slug: "the-golden-notebook", name: "The Golden Notebook", author: "Doris Lessing", year: 1962, openingLine: "The two women were alone in the London flat.", level: "impossible" },
  { slug: "middlemarch", name: "Middlemarch", author: "George Eliot", year: 1871, openingLine: "Miss Brooke had that kind of beauty which seems to be thrown into relief by poor dress.", level: "impossible" },
  { slug: "vanity-fair", name: "Vanity Fair", author: "William Makepeace Thackeray", year: 1848, openingLine: "While the present century was in its teens, and on one sunshiny morning in June, there drove up to the great iron gate of Miss Pinkerton's academy a large family coach.", level: "impossible" },
  { slug: "wide-sargasso-sea", name: "Wide Sargasso Sea", author: "Jean Rhys", year: 1966, openingLine: "They say when trouble comes close ranks, and so the white people did.", level: "impossible" },
];

export default BOOKS_E89;
