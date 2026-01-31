use crate::types::PublicationStatus;

// TODO: Hone the fields we can pull across different providers

/// Metadata about a media item from an external metadata provider
pub struct ExternalMediaMetadata {
	pub provider: &'static str,
	pub external_id: String,

	pub title: Option<String>,
	pub summary: Option<String>,
	pub number: Option<f32>,          // TODO: string?
	pub release_date: Option<String>, // TODO: Date type?
	pub page_count: Option<i32>,

	pub isbn: Option<String>,
	pub isbn_13: Option<String>,

	pub writers: Vec<String>,
	pub artists: Vec<String>,
	pub colorists: Vec<String>,
	pub letterers: Vec<String>,
	pub cover_artists: Vec<String>,

	pub cover_url: Option<String>,

	pub provider_url: Option<String>,
}

/// Metadata about a series from an external metadata provider
pub struct ExternalSeriesMetadata {
	pub provider: &'static str,
	pub external_id: String,

	pub title: String,
	pub alternative_titles: Vec<String>,
	pub summary: Option<String>,
	pub status: Option<PublicationStatus>,
	pub year: Option<i32>,
	pub end_year: Option<i32>,

	pub genres: Vec<String>,
	pub tags: Vec<String>,
	pub age_rating: Option<String>,

	pub authors: Vec<String>,
	pub artists: Vec<String>,
	pub publisher: Option<String>,

	pub cover_url: Option<String>,
	pub volume_count: Option<i32>,
}
