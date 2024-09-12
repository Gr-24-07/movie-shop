import { Genre, Movie, People, PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();
async function main() {
    const movieList: Omit<Movie, "id">[] = [
        {
            title: "The Shawshank Redemption",
            description:
                "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
            price: new Decimal(99),
            stock: 500,
            releaseDate: new Date("1995-03-03"),
            imageURL:
                "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
        },
        {
            title: "The Godfather",
            description:
                "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
            price: new Decimal(49.99),
            stock: 157,
            releaseDate: new Date("1972-09-27"),
            imageURL:
                "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        },
        {
            title: "The Dark Knight",
            description:
                "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
            price: new Decimal(75.5),
            stock: 92,
            releaseDate: new Date("2008-07-25"),
            imageURL:
                "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/xQPgyZOBhaz1GdCQIPf5A5VeFzO.jpg",
        },
        {
            title: "Your Name.",
            description:
                "High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki’s body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.",
            price: new Decimal(159.99),
            stock: 198,
            releaseDate: new Date("2017-04-12"),
            imageURL:
                "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vfJFJPepRKapMd5G2ro7klIRysq.jpg",
        },
        {
            title: "Spirited Away",
            description:
                "A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.",
            price: new Decimal(129.49),
            stock: 22,
            releaseDate: new Date("2003-09-19"),
            imageURL:
                "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
        },
        {
            title: "The Lord of the Rings: The Fellowship of the Ring",
            description:
                "Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home in order to keep it from falling into the hands of its evil creator. Along the way, a fellowship is formed to protect the ringbearer and make sure that the ring arrives at its final destination: Mt. Doom, the only place where it can be destroyed.",
            price: new Decimal(79.99),
            stock: 15,
            releaseDate: new Date("2001-12-19"),
            imageURL:
                "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
        },
        {
            title: "Deadpool & Wolverine",
            description:
                "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
            price: new Decimal(249.99),
            stock: 1009,
            releaseDate: new Date("2024-07-24"),
            imageURL:
                "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
        },
        {
            title: "Inside Out 2",
            description:
                "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
            price: new Decimal(99.49),
            stock: 57,
            releaseDate: new Date("2024-07-17"),
            imageURL:
                "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
        },
        {
            title: "Avengers: Infinity War",
            description:
                "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
            price: new Decimal(179.0),
            stock: 23,
            releaseDate: new Date("2018-04-25"),
            imageURL:
                "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
        },
        {
            title: "It Ends with Us",
            description:
                "Lily Bloom overcomes a traumatic childhood to embark on a new life in Boston and chase a lifelong dream of opening her own business. A chance meeting with charming neurosurgeon Ryle Kincaid sparks an intense connection, but as the two fall deeply in love, Lily begins to see sides of Ryle that remind her of her parents' relationship.",
            price: new Decimal(99.29),
            stock: 128,
            releaseDate: new Date("2024-08-07"),
            imageURL:
                "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/AjV6jFJ2YFIluYo4GQf13AA1tqu.jpg",
        },
        {
            title: "Bad Boys: Ride or Die",
            description:
                "After their late former Captain is framed, Lowrey and Burnett try to clear his name, only to end up on the run themselves.",
            price: new Decimal(155.99),
            stock: 55,
            releaseDate: new Date("2024-05-06"),
            imageURL:
                "https://image.tmdb.org/t/p/w1280/oGythE98MYleE6mZlGs5oBGkux1.jpg",
        },
        {
            title: "Beetlejuice",
            description:
                "A newly dead New England couple seeks help from a deranged demon exorcist to scare an affluent New York family out of their home.",
            price: new Decimal(239.99),
            stock: 174,
            releaseDate: new Date("1988-08-19"),
            imageURL:
                "https://image.tmdb.org/t/p/w1280/nnl6OWkyPpuMm595hmAxNW3rZFn.jpg",
        },
        {
            title: "Twisters",
            description:
                "As storm season intensifies, the paths of former storm chaser Kate Carter and reckless social-media superstar Tyler Owens collide when terrifying phenomena never seen before are unleashed. The pair and their competing teams find themselves squarely in the paths of multiple storm systems converging over central Oklahoma in the fight of their lives.",
            price: new Decimal(100.99),
            stock: 55,
            releaseDate: new Date("2024-07-12"),
            imageURL:
                "https://image.tmdb.org/t/p/w1280/pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg",
        },
        {
            title: "Interstellar",
            description:
                "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
            price: new Decimal(99.99),
            stock: 100,
            releaseDate: new Date("2014-11-07"),
            imageURL:
                "https://image.tmdb.org/t/p/w1280/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        },
    ];

    const movies = await prisma.movie.createMany({
        data: movieList,
    });

    const genreList: Omit<Genre, "id" | "deletedDate">[] = [
        {
            name: "Action",
        },
        {
            name: "Romance",
        },
        {
            name: "Drama",
        },
        {
            name: "Comedy",
        },
        {
            name: "Animation",
        },
        {
            name: "Adventure",
        },
        {
            name: "Crime",
        },
        {
            name: "Thriller",
        },
        {
            name: "Fantasy",
        },
        {
            name: "Family",
        },
    ];

    const genres = await prisma.genre.createMany({
        data: genreList,
    });
    const peopleList: Omit<People, "id">[] = [
        {
            name: "Tim Robbins", // The Shawshank Redemption
        },
        {
            name: "Morgan Freeman", // The Shawshank Redemption
        },
        {
            name: "Frank Darabont", // Director of The Shawshank Redemption
        },
        {
            name: "Marlon Brando", // The Godfather
        },
        {
            name: "Al Pacino", // The Godfather
        },
        {
            name: "Francis Ford Coppola", // Director of The Godfather
        },
        {
            name: "Christian Bale", // The Dark Knight
        },
        {
            name: "Heath Ledger", // The Dark Knight
        },
        {
            name: "Christopher Nolan", // Director of The Dark Knight
        },
        {
            name: "Ryunosuke Kamiki", // Your Name (voice actor for Taki)
        },
        {
            name: "Mone Kamishiraishi", // Your Name (voice actor for Mitsuha)
        },
        {
            name: "Makoto Shinkai", // Director of Your Name
        },
        {
            name: "Rumi Hiiragi", // Spirited Away (voice actor for Chihiro)
        },
        {
            name: "Miyu Irino", // Spirited Away (voice actor for Haku)
        },
        {
            name: "Hayao Miyazaki", // Director of Spirited Away
        },
        {
            name: "Elijah Wood", // The Lord of the Rings: The Fellowship of the Ring
        },
        {
            name: "Ian McKellen", // The Lord of the Rings: The Fellowship of the Ring
        },
        {
            name: "Peter Jackson", // Director of The Lord of the Rings: The Fellowship of the Ring
        },
        {
            name: "Ryan Reynolds", // Deadpool & Wolverine
        },
        {
            name: "Hugh Jackman", // Deadpool & Wolverine
        },
        {
            name: "Shawn Levy", // Director of Deadpool & Wolverine
        },
        {
            name: "Amy Poehler", // Inside Out 2 (voice actor for Joy)
        },
        {
            name: "Phyllis Smith", // Inside Out 2 (voice actor for Sadness)
        },
        {
            name: "Kelsey Mann", // Director of Inside Out 2
        },
        {
            name: "Robert Downey Jr.", // Avengers: Infinity War
        },
        {
            name: "Chris Hemsworth", // Avengers: Infinity War
        },
        {
            name: "Anthony Russo", // Director of Avengers: Infinity War
        },
        {
            name: "Joe Russo", // Director of Avengers: Infinity War
        },
        {
            name: "Blake Lively", // It Ends with Us
        },
        {
            name: "Justin Baldoni", // Director of It Ends with Us
        },
        {
            name: "Viggo Mortensen", // The Lord of the Rings: The Fellowship of the Ring
        },
    ];

    const people = await prisma.people.createMany({
        data: peopleList,
    });

    const movieGenreMap = {
        "The Shawshank Redemption": ["Drama", "Crime"],
        "The Godfather": ["Drama", "Crime"],
        "The Dark Knight": ["Action", "Drama", "Crime"],
        "Your Name.": ["Romance", "Animation", "Drama"],
        "Spirited Away": ["Animation", "Adventure", "Family"],
        "The Lord of the Rings: The Fellowship of the Ring": [
            "Adventure",
            "Fantasy",
        ],
        "Deadpool & Wolverine": ["Action", "Comedy"],
        "Inside Out 2": ["Animation", "Comedy", "Family"],
        "Avengers: Infinity War": ["Action", "Adventure", "Fantasy"],
        "It Ends with Us": ["Drama", "Romance"],
        "Bad Boys: Ride or Die": ["Action", "Chrime", "Thriller", "Comedy"],
        Beetlejuice: ["Fantasy", "Comedy"],
        Twisters: ["Action", "Adventure", "Thriller"],
        Interstellar: ["Adventure", "Drama"],
    };

    for (const [movieTitle, genres] of Object.entries(movieGenreMap)) {
        const movie = await prisma.movie.findFirst({
            where: { title: movieTitle },
        });

        if (movie) {
            const genreIds = await prisma.genre.findMany({
                where: {
                    name: {
                        in: genres,
                    },
                },
                select: {
                    id: true,
                },
            });

            await prisma.movie.update({
                where: { id: movie.id },
                data: {
                    genres: {
                        connect: genreIds.map((genre) => ({ id: genre.id })),
                    },
                },
            });
        }
    }

    await prisma.job.createMany({
        data: [
            {
                jobTitle: "Actor",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "The Shawshank Redemption" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Tim Robbins" },
                }))!.id,
            },
            {
                jobTitle: "Actor",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "The Shawshank Redemption" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Morgan Freeman" },
                }))!.id,
            },
            {
                jobTitle: "Director",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "The Shawshank Redemption" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Frank Darabont" },
                }))!.id,
            },
            {
                jobTitle: "Actor",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "The Godfather" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Marlon Brando" },
                }))!.id,
            },
            {
                jobTitle: "Actor",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "The Godfather" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Al Pacino" },
                }))!.id,
            },
            {
                jobTitle: "Director",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "The Godfather" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Francis Ford Coppola" },
                }))!.id,
            },
            {
                jobTitle: "Actor",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "The Dark Knight" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Christian Bale" },
                }))!.id,
            },
            {
                jobTitle: "Actor",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "The Dark Knight" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Heath Ledger" },
                }))!.id,
            },
            {
                jobTitle: "Director",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "The Dark Knight" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Christopher Nolan" },
                }))!.id,
            },
            {
                jobTitle: "Voice Actor",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "Your Name." },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Ryunosuke Kamiki" },
                }))!.id,
            },
            {
                jobTitle: "Voice Actor",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "Your Name." },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Mone Kamishiraishi" },
                }))!.id,
            },
            {
                jobTitle: "Director",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "Your Name." },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Makoto Shinkai" },
                }))!.id,
            },
            {
                jobTitle: "Voice Actor",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "Spirited Away" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Rumi Hiiragi" },
                }))!.id,
            },
            {
                jobTitle: "Voice Actor",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "Spirited Away" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Miyu Irino" },
                }))!.id,
            },
            {
                jobTitle: "Director",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "Spirited Away" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Hayao Miyazaki" },
                }))!.id,
            },
            {
                jobTitle: "Actor",
                movieId: (await prisma.movie.findFirst({
                    where: {
                        title: "The Lord of the Rings: The Fellowship of the Ring",
                    },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Elijah Wood" },
                }))!.id,
            },
            {
                jobTitle: "Actor",
                movieId: (await prisma.movie.findFirst({
                    where: {
                        title: "The Lord of the Rings: The Fellowship of the Ring",
                    },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Ian McKellen" },
                }))!.id,
            },
            {
                jobTitle: "Director",
                movieId: (await prisma.movie.findFirst({
                    where: {
                        title: "The Lord of the Rings: The Fellowship of the Ring",
                    },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Peter Jackson" },
                }))!.id,
            },
            {
                jobTitle: "Actor",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "Deadpool & Wolverine" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Ryan Reynolds" },
                }))!.id,
            },
            {
                jobTitle: "Actor",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "Deadpool & Wolverine" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Hugh Jackman" },
                }))!.id,
            },
            {
                jobTitle: "Director",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "Deadpool & Wolverine" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Shawn Levy" },
                }))!.id,
            },
            {
                jobTitle: "Voice Actor",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "Inside Out 2" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Amy Poehler" },
                }))!.id,
            },
            {
                jobTitle: "Voice Actor",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "Inside Out 2" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Phyllis Smith" },
                }))!.id,
            },
            {
                jobTitle: "Director",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "Inside Out 2" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Kelsey Mann" },
                }))!.id,
            },
            {
                jobTitle: "Actor",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "Avengers: Infinity War" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Robert Downey Jr." },
                }))!.id,
            },
            {
                jobTitle: "Actor",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "Avengers: Infinity War" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Chris Hemsworth" },
                }))!.id,
            },
            {
                jobTitle: "Director",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "Avengers: Infinity War" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Anthony Russo" },
                }))!.id,
            },
            {
                jobTitle: "Director",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "Avengers: Infinity War" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Joe Russo" },
                }))!.id,
            },
            {
                jobTitle: "Actor",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "It Ends with Us" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Blake Lively" },
                }))!.id,
            },
            {
                jobTitle: "Actor",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "It Ends with Us" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Justin Baldoni" },
                }))!.id,
            },
            {
                jobTitle: "Director",
                movieId: (await prisma.movie.findFirst({
                    where: { title: "It Ends with Us" },
                }))!.id,
                peopleId: (await prisma.people.findFirst({
                    where: { name: "Justin Baldoni" },
                }))!.id,
            },
        ],
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
