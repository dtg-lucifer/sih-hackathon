const siteIcons = document.querySelectorAll(".site__icon");
const backBtn = document.querySelector(".back__btn__container");
const detailsContainer = document.querySelector(".details__container");
const siteContainer = document.querySelector(".sites__wrapper");

var MAP = L.map("map");
var popup = L.popup();

let marker, circle, zoomed;
let lat, lng, acc;
let routeControl;

MAP.setView([51.505, -0.09], 13);
MAP.on('click', (e) => {
	popup
		.setLatLng(e.latlng)
		.setContent("Located at " + e.latlng.toString())
		.openOn(MAP);
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(MAP);



navigator.geolocation.watchPosition((pos) => {
	lat = pos.coords.latitude;
	lng = pos.coords.longitude;
	acc = pos.coords.accuracy;

	if (marker) {
		MAP.removeLayer(marker)
		MAP.removeLayer(circle)
	}

	marker = L.marker([lat, lng]).addTo(MAP);
	circle = L.circle([lat, lng], { radius: acc }).addTo(MAP);

	marker.bindPopup(`You are here`).openPopup();

	if (!zoomed) zoomed = MAP.fitBounds(circle.getBounds());
	MAP.setView([lat, lng], 15);

}, err => {
	if (err.code === 1) alert("Please allow location access to use this app")
	else alert("An error occured while trying to get your location")
})

siteIcons.forEach(el => {
	el.addEventListener("click", e => {
		if (e.target.getAttribute("data-icon") === "DK") {
			if (routeControl) removeRoute();
			routeControl = L.Routing.control({
				waypoints: [
					L.latLng(lat, lng),
					L.latLng(22.654808, 88.357572)
				],
				fitSelectedRoutes: true,
				routeWhileDragging: true,
			}).addTo(MAP);
			showDetails("DK");
		} else if (e.target.getAttribute("data-icon") === "BM") {
			if (routeControl) removeRoute();
			routeControl = L.Routing.control({
				waypoints: [
					L.latLng(lat, lng),
					L.latLng(22.630996, 88.354518)
				],
				fitSelectedRoutes: true,
				routeWhileDragging: true
			}).addTo(MAP);
			showDetails("BM");
		} else {
			if (routeControl) removeRoute();
			routeControl = L.Routing.control({
				waypoints: [
					L.latLng(lat, lng),
					L.latLng(22.660093, 88.362922)
				],
				fitSelectedRoutes: true,
				routeWhileDragging: true
			}).addTo(MAP);
			showDetails("AP")
		}
		siteContainer.classList.add("display__none");
	})
})

backBtn.addEventListener("click", () => {
	siteContainer.classList.remove("display__none");
	detailsContainer.classList.add("display__none");
	backBtn.classList.add("display__none");
	removeRoute();
})

function showDetails(siteName) {
	detailsContainer.classList.remove("display__none");
	backBtn.classList.remove("display__none");
	if (siteName === 'DK') {
		detailsContainer.innerHTML = `
		<img src="../assets/D2.jpg" alt="Dakshineswar Kali Temple" />
		<h1>Dakshineswar</h1>
		<span>
			The temple was built in 1855 by Rani Rashmoni, a Zamindar, philanthropist and a devotee of Kali Maa.
			The temple is known for its association with Ramakrishna and Ma Sarada Devi, mystics of 19th century
			Bengal. The Temple complex on the bank of river Hooghly, West Bengal.
		</span>
		<h3>History of Dakshineswar Kali Temple</h3>
		<span>Rani Rashmoni built the Dakshineswar Kali Temple in the middle of the 19th century. The temple was
			the result of a dream that the Rani saw before embarking on a pilgrimage tour of Banaras (now
			Varanasi).

			It was in the year 1847 that Rani Rashmoni planned to take a pilgrimage tour of the sacred Hindu
			city of Banaras (Kashi, which is now known as Varanasi).

			In those days, no railways were connecting the two places. So, twenty-four boats were prepared,
			which would carry the Rani along with her relatives, servants, and supplies.

			However, the night before the pilgrimage tour, Rani Rashmoni had a vision of Goddess Kali in a
			dream, who reportedly told her,

			“There is no need for going to Banaras. You should install my statue in a beautiful temple along the
			banks of River Ganges. You should arrange for my worship there.”

			The Divine Mother told Rani that she would manifest herself in the image and accept the worship of
			the people at that place.

			Rani was intensely moved by the dream and decided to materialize it. So, she instructed her people
			to search for a suitable plot of land for erecting the Kali Temple.

			A hunt for a suitable land was undertaken, and eventually, a 20-acre plot was chosen in the village
			of Dakshineswar. The construction of the Dakshineswar Kali Temple began on this very site in the
			year 1847 under the patronage of Rani Rashmoni.

			It was completed in 1855.

			The estimated cost of the construction of the Dakshineswar Kali Temple was Rs. 9 Lakhs.

			The temple spanned 25 acres of land, making it one of the most significant temples in Kolkata. The
			idols of Gods and Goddesses were installed on the auspicious day of the “Snana Yatra” on 31st May
			1855. The temple was dedicated to Sri Sri Jagadishwari Kalimata Thakurani.
		</span>
		<h3>Temples of Lord Shiva</h3>
		<span>The Dakshineswar Kali Temple premise is highly admired for its twelve identical Lord Shiva
			temples. These temples have been erected opposite to the Kuthi Bari. They rest close to the banks of
			the Ganges River.

			The interiors of these Shiva temples have been adorned with white and black stone. Each of these
			temples has beautiful Shiva Lingas that have been done in black marble. These Shiva temples are east
			facing. They follow the typical “Aat Chala” Bengal architecture.
		</span>
		<h3>The Vishnu Temple</h3>
		<span>
			The Vishnu Temple or the Radha Kanta Temple lies to the northeast side of the Dakshineswar temple
			complex. There’s a flight of stairs that leads to the inside of the temple. Here, you will see a 21
			and a half inches idol of Lord Krishna as well as 16 inches idol of Radha. Sri Ramakrishna himself
			used to perform puja at this temple.
		</span>
		<h3>Important Dates</h3>
		<span>Tuesdays and Saturdays are considered as very auspicious days for Kali worship. The Dakshineswar
			Kali Temple sees a vast congregation of devotees on both these days. Sandhya Aarti is the main
			attraction for devotees.

			Moreover, the temple becomes a major attraction during the Kali Puja. It is wonderfully decorated
			with flowers as well as has an amazing lighting arrangement. On the “Amavasya” tithi, an elaborate
			evening Aarti is performed, and the temple is beautifully decked up.
		</span>
		<h3>How to reach the Dakshineswar Kali Temple?</h3>
		<span>
			By Train: Dakshineswar is a railway station on the Sealdah-Dankuni sector. Most of the local trains,
			such as the Dankuni Local from Sealdah station, stop here. Some long-distance trains like Darjeeling
			Mail also stop at this station.

			By Road: It is connected to Kolkata. You need to travel along Barrackpore Trunk Road and turn left
			for Dakshineswar just after Baranagore and before Dunlop Rail-over bridge. Moreover, regular bus
			service is available from Kolkata to Dakshineswar.

			Cycle Rickshaws, as well as Auto Rickshaws, are available for local transport.
		</span>
		`
	} else if (siteName === 'BM') {
		detailsContainer.innerHTML = `
		<img src="../assets/B2.jpg" alt="Dakshineswar Kali Temple" />
		<h1>Belur Math</h1>
		<span>
			Belur Math or Belur Mutt is one of the most popular places to visit in Kolkata. Founded by Swami
			Vivekananda is the headquarters of the Ramakrishna Math and Mission. <br>
			Notable for its architecture the temple is a beautiful example of Ramakrishna Movement. The
			historical paramountcy of this place dates back to 19th century wherein Swami Vivekananda, a
			disciple of Sri Ramakrishna lived the last years of his life. <br>
			He dedicated the place by worshiping the urn containing the sacred relics of Sri Ramakrishna, which
			he himself use to carry on his shoulders to the place of worship.

		</span>
		<h3>History of Belur Math</h3>
		<span>
			belur math was established in January 1897, by Swami Vivekananda who was the disciple of Sri
			Ramakrishna. Swami Vivekananda returned back to India from Colombo with a small group of disciples
			and started work on the two one at Belur, and the others at Mayavati, Almora, Himalayas called the
			Advaita Ashrama.

			He inaugrated the Belur Math in 1898; an urn containing the sacred relics of Sri Ramakrishna, was
			carried by him on his shoulders to the place of worship. “The blazing light of universal harmony
			that will emanate from here will flood the whole world.” He lived the last years of his life in
			Belur Math only.

		</span>
		<h3>On the campus are various temples like</h3>
		<span> • Ramakrishna Temple , <br>
			• Old Ramakrishna Temple , <br>
			• Swami Brahmananda Temple , <br>
			• Maa Sarada Devi Temple, <br>
			• Swami Vivekananda Temple, <br>
			Other places to see here are the old Math, Swami Vivekananda’s mango tree, Ramakrishna museum, and
			Swami Vivekananda's living room.
		</span>
		<h3>About The Temple</h3>
		<span>
			A temple in Belur Math
			Swami Vivekananda had a lifelong desire to preserve the holy ashes of Ramkrishna. Therefore He
			decided to enshrine them in a grand and sacred shrine dedicated to his guru, “Shri Ramkrishna
			Paramhansa.”
			This was not possible during Swamiji’s lifetime. So he decided to preserve the mortal remains of Sri
			Ramakrishna and install his idol in the present ‘old temple.’ However, before his demise, Swamiji
			had planned a massive temple.

			Swami Vijnanananda, his brother’s disciple and a qualified civil engineer, drew the plan following
			his instructions. Swamiji did not survive until the temple’s completion, but he reassured everyone
			that he would feel happy and satisfied in the heavenly abode.

			Swami Shivananda laid the foundation stone for Belur Math on the birthday of Sri Ramakrishna (March
			13, 1929). Due to a lack of adequate funds, the construction did not begin immediately
			It started only five years later, with significant contributions from Miss Helen Rubel (also known
			as Bhakti) and Mrs. Anna Worcester (also known as Annapurna). Through their generosity, these two
			American devotees have become indispensably linked with the history of Ramakrishna Math and
			Ramakrishna Mission and have won the hearts of all Sri Ramakrishna devotees.

			Engineers recommended that the temple be moved about a hundred feet from its original location
			before initiating the construction. Swami Vijnanananda, the Order’s president, re-laid the
			foundation on Guru-Purnima, on July 16, 1935.

			Shri Ramkrishna’s idol was shifted to the new temple, and indeed it was a ray of hope and joy for
			the entire community of Shri Ramakrishna’s disciples.

		</span>
		<h3>How to reach Belur Math?</h3>
		<span>
			Belur Math has located 6 km from Howrah in Kolkata (W.Bengal) <br>
			By car or taxi is the most convenient option. <br>
			Other options are: <br>
			Belur Math Bus Route: From Howrah: Bus numbers: 51, 54 and 56 <br>
			A bus is a good option as they drop you at Belur Math gate <br>
			By Train: <br>
			Frequent EMU trains from Howrah from early morning to late night will get to Belur Math. <br>
			From Howrah to Belur Math (Locals) <br>
			07:40 – 08:55 – 10:10 – 16:05 – 18:30 <br>
			By Ferry: <br>
			Frequent ferries from Fairlie place to Kutighat. <br>
		</span>
		`
	} else {
		detailsContainer.innerHTML = `
		<img src="../assets/AP2.jpg" alt="Dakshineswar Kali Temple" />
		<h1>Adyapeath</h1>
		<span>
			Adyapeath Temple is another Hindu temple built in 1967. It had initially established in 1915 by the
			followers of Annada Charan Bhattacharya, a great devotee of Maa Kali and Sri Ramakrishna. Adyapeath
			temple timings are from 04:30 am to 07:00 pm. <br>
			Adya Ma Temple, the divine form of Ma Kali, holds great religious significance. The main altar of
			the temple has three sub-altars. At the bottom is the idol of Sri Ramakrishna, in the middle is our
			adya, and the top peetha has the model of Radha and Krishna.
		</span>
		<h3>History of adyapeath temple (DREAMS AND VISIONS)</h3>
		<span>
			In 1915, a young Brahmin named Annada Charan Bhattacharya was setting up a successful practice in
			Ayurvedic medicine in Calcutta. A capable scientist, he had discovered seven patent medicines and
			went on to become a renowned doctor all over Bengal. Annada Thakur, as he came to be known, was a
			deeply religious man, filled with devotion to the Divine Mother Kali and Her great
			nineteenth-century Bengali saint, Sri Ramakrishna. Nevertheless, even such a spiritual man as Annada
			was taken aback by the strange visions and dreams he began to have: A vision of four girls carrying
			an image (murthi) of the Divine Mother Kali down a Calcutta street, invisible to all but Annada, yet
			so real that he folded his palms and, to the puzzlement of passersby, bowed to thin air. Two dreams
			of a sannyasin telling him to shave his head and bathe in the Ganges, to which the outraged Annada
			replied, “Reverend Sir, if you again talk of head-shaving, I shall hold you by the neck and push you
			out of the room.” Then, stranger yet, dreams of Sri Ramakrishna himself, so real that Annada was
			convinced the venerable saint, though long departed from this life, had been in the room with him.
			When the order came from Sri Ramakrishna to shave his head and bathe in the Ganges, Annada could
			hardly refuse. Sri Ramakrishna then told him to go to the Eden Gardens, a magnificent British-built
			public garden in Calcutta, and to look there for a murthi of the Divine Mother where a coconut tree
			and a pakur tree grew together. There, at the bottom of a pond, Annada and three companions found
			the image. A commemorative plaque marks the spot today.

		</span>
		<h3>On which days the temple open?</h3>
		<span>The temple opens 3 times in a day, early morning, 10:30-11:30 am, 6:30-7:30 pm. During summer the
			timing is changed by half an hour. Please check the opening times before going there. The temple is
			open whole day on 52 days in a year on specific 'tithi'.
		</span>
		<h3>About The Temple</h3>
		<span>
			Dream visitations from Sri Ramakrishna also continued. He offered Annada moksha, but Annada,
			confronted by a vision of thousands of his suffering fellow humans, responded, “I do not care for
			liberation. I would rather go through a hundred thousand hells doing good to others: This is my
			religion.” In 1919, Sri Ramakrishna revealed what Annada’s life’s work was to be: the establishment
			of a temple to the Divine Mother Adya Ma. The temple was to be in reality three temples enveloping
			one another: the first to Sri Ramakrishna, the second to Adya Ma, and the third to Krishna and
			Radha. The altar was to be three altars built like large stairsteps: Ramakrishna on the bottom, Adya
			Ma in the middle, and Krishna and Radha on the top, encircled by the sacred syllable om. In
			conjunction with the temple, there were to be separate ashrams for men and women, boys’ and girls’
			orphanages and schools, a free clinic to prevent the spread of contagious disease, and distribution
			of food and clothing to the poor. At Sri Ramakrishna’s behest, Annada Thakur spent a year with his
			parents in Raujan, in what is now Bangladesh, and then returned to Calcutta and carried out
			spiritual practices for a year on the bank of the Ganges. Then, on January 14, 1921, a celebration
			was held, which is still celebrated at the temple as Siddhotsab. The same year a committee was
			formed for the establishment of the Dakshineswar Ramakrishna Sangha. In early 1927, the Sangha
			acquired a piece of land with some adjoining old Shiva temples, and on January 31, 1928, Annada
			Thakur broke ground for the temple on a compound of nearly 14 acres.

		</span>
		<h3>How to reach Adyapeath?</h3>
		<span>
			The temple opens 3 times in a day, early morning, 10:30-11:30 am, 6:30-7:30 pm. During summer the timing is changed by half an hour. Please check the opening times before going there. The temple is open whole day on 52 days in a year on specific 'tithi'.

			How to Reach Adyapeath Temple?
			
			It had located in the Dakshineswar area of Kolkata, which had well connected with all the city areas of Kolkata and Howrah. Visitors can reach here via road, rail and water mode. 
			
			By Rail: Dakshineshwar Railway Station is the nearest railway station, and the Kolkata railway station is around 10 KM from here. Howrah Railway Station is also around 10 KM. Ferry rides and boats are also exciting ways to reach here.
			
			By Air: Netaji Subash Chandra Airport is the nearest airport.
		</span>
		`
	}
}

function removeRoute() {
	MAP.removeControl(routeControl);
	zoomed = false;
	MAP.fitBounds(circle.getBounds());
}