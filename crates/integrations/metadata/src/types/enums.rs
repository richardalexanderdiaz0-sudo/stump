/// Types of media that can be handled by metadata providers
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum MediaType {
	Manga,
	Comic,
	Book,
	LightNovel,
}

#[derive(Debug, Clone, Copy)]
pub enum PublicationStatus {
	Ongoing,
	Completed,
	Hiatus,
	Cancelled,
	Upcoming,
}
