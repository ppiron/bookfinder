<script>
  export let book;
</script>

<div
  class="relative hidden xs:flex min-h-[210px] bg-white rounded-sm shadow-lg lg:w-5/6"
>
  {#if book.volumeInfo.imageLinks}
    <img
      src={book.volumeInfo.imageLinks.thumbnail}
      alt="book thumbnail"
      class="relative flex-shrink-0 block object-cover w-32 h-48 mr-12 shadow-xl -top-6 left-6"
    />
  {:else}
    <div
      class="relative flex-shrink-0 w-32 h-48 mr-10 bg-center bg-no-repeat bg-contain border shadow-xl bg-gray-50 -top-6 left-4 bg-no-image"
    />
  {/if}
  <!-- <p>{book.volumeInfo.imageLinks.thumbnail}</p> -->
  <div class="flex flex-col items-start justify-between py-6 pr-6">
    <div>
      <a
        href={book.volumeInfo.canonicalVolumeLink}
        class="text-lg font-bold leading-5 text-gray-500 line-clamp-2 hover:underline"
      >
        {book.volumeInfo.title}
      </a>
      <p class="mt-2 text-sm text-gray-500 line-clamp-1">
        By: {book.volumeInfo.authors
          ? book.volumeInfo.authors.join(", ")
          : "No authors found"}
      </p>
      <p class="text-sm text-gray-500 line-clamp-2">
        Published by: {book.volumeInfo.publisher
          ? book.volumeInfo.publisher
          : "No publisher found"}
      </p>
    </div>
    <a
      href={book.volumeInfo.canonicalVolumeLink}
      class="px-6 py-1 mt-6 text-sm text-gray-100 transition-colors rounded-md bg-emerald-500 hover:bg-emerald-600"
      >See this book</a
    >
  </div>
</div>

<!-- mobile view  -->
<div
  class="flex flex-col items-center pt-6 bg-white rounded-sm shadow-lg xs:hidden"
>
  {#if book.volumeInfo.imageLinks}
    <img
      src={book.volumeInfo.imageLinks.thumbnail}
      alt="book thumbnail"
      class="relative flex-shrink-0 block object-cover w-32 h-48 shadow-xl"
    />
  {:else}
    <div class="relative flex-shrink-0 w-32 h-48 border shadow-xl bg-gray-50" />
  {/if}
  <!-- <p>{book.volumeInfo.imageLinks.thumbnail}</p> -->
  <div class="flex flex-col items-center justify-between px-6 py-6">
    <div>
      <a
        href={book.volumeInfo.canonicalVolumeLink}
        class="text-lg font-bold leading-5 text-gray-500"
      >
        {book.volumeInfo.title}
      </a>
      <p class="mt-2 text-sm text-gray-500">
        By: {book.volumeInfo.authors
          ? book.volumeInfo.authors.join(", ")
          : "No authors found"}
      </p>
      <p class="text-sm text-gray-500">
        Published by: {book.volumeInfo.publisher
          ? book.volumeInfo.publisher
          : "No publisher found"}
      </p>
    </div>
    <a
      href={book.volumeInfo.canonicalVolumeLink}
      class="px-6 py-1 mt-6 text-sm text-gray-100 transition-colors rounded-md bg-emerald-500 hover:bg-emerald-600"
      >See this book</a
    >
  </div>
</div>
