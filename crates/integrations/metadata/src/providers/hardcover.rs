use crate::{
	error::MetadataProviderError,
	types::{
		ExternalMediaMetadata, ExternalSeriesMetadata, MatchCandidate, MediaType,
		SearchQuery,
	},
	MetadataProvider,
};

pub struct HardcoverClient {
	client: reqwest::Client,
	api_token: Option<String>,
}

// // https://docs.hardcover.app/api/guides/searching/
// #[derive(Debug, EnumString)]
// #[strum(serialize_all = "PascalCase")]
// enum HardcoverQueryType {
// 	Authors,
// 	Books,
// 	Series,
// }

// TODO: Take from https://github.com/stumpapp/stump/blob/jm/metadata-sources/crates/metadata_sources/src/sources/hardcover/request.rs
// See also https://github.com/stumpapp/stump/blob/jm/metadata-sources/crates/metadata_sources/src/sources/hardcover/response.rs

impl HardcoverClient {
	const API_URL: &'static str = "https://api.hardcover.app/v1/graphql";

	pub fn new(api_token: String) -> Self {
		Self {
			client: reqwest::Client::new(),
			api_token: Some(api_token),
		}
	}

	pub fn token(&self) -> Result<String, MetadataProviderError> {
		self.api_token
			.clone()
			.ok_or(MetadataProviderError::MissingToken)
	}
}

#[async_trait::async_trait]
impl MetadataProvider for HardcoverClient {
	fn id(&self) -> &'static str {
		"hardcover"
	}

	fn name(&self) -> &'static str {
		"Hardcover"
	}

	fn supported_media_types(&self) -> Vec<MediaType> {
		vec![MediaType::Book]
	}

	// query SeriesNamedWayfarers {
	//   search(
	//       query: "wayfarers",
	//       query_type: "Series",
	//       per_page: 50,
	//   ) {
	//       results
	//   }
	// }
	// https://docs.hardcover.app/api/guides/searching/
	async fn search_series(
		&self,
		query: &SearchQuery,
	) -> Result<Vec<MatchCandidate>, MetadataProviderError> {
		let token = self.token()?;

		let body = serde_json::json!({
			"query": format!(
				"query SearchSeries {{ search(query: \"{}\", query_type: \"Series\", per_page: {}) {{ results }} }}",
				query.title,
				query.limit.unwrap_or(50),
			)
		});

		// TODO: Type the response -> https://github.com/stumpapp/stump/blob/jm/metadata-sources/crates/metadata_sources/src/sources/hardcover/response.rs
		let response = self
			.client
			.post(Self::API_URL)
			.bearer_auth(token)
			.json(&body)
			.send()
			.await?;

		dbg!(&response);

		Err(MetadataProviderError::OperationNotSupported)
	}

	// https://docs.hardcover.app/api/guides/searching/
	async fn search_media(
		&self,
		query: &SearchQuery,
	) -> Result<Vec<MatchCandidate>, MetadataProviderError> {
		Err(MetadataProviderError::OperationNotSupported)
	}

	async fn fetch_series_metadata(
		&self,
		external_id: &str,
	) -> Result<ExternalSeriesMetadata, MetadataProviderError> {
		Err(MetadataProviderError::OperationNotSupported)
	}

	async fn fetch_media_metadata(
		&self,
		external_id: &str,
	) -> Result<ExternalMediaMetadata, MetadataProviderError> {
		Err(MetadataProviderError::OperationNotSupported)
	}
}
