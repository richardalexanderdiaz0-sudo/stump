pub struct SearchQuery {
	pub title: String,
	pub author: Option<String>,
	pub isbn: Option<String>,
	pub year: Option<i32>,
	pub limit: Option<u32>,
}
