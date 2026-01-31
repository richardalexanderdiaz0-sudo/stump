use async_trait::async_trait;

/// Types of media that can be handled by metadata providers
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum MediaType {
	Manga,
	Comic,
	Book,
	LightNovel,
	GraphicNovel,
}

/// Represents an external metadata source
#[async_trait]
pub trait MetadataProvider: Send + Sync {
	/// Unique identifier for this provider (e.g., "hardcover", "anilist")
	fn id(&self) -> &'static str;

	/// Human-readable name for display
	fn name(&self) -> &'static str;

	/// Media types supported by this provider
	fn supported_media_types(&self) -> Vec<MediaType>;
}
