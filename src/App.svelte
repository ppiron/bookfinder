<script>
  import Book from "./components/Book.svelte";

  async function searchBooks() {
    const res = await fetch(
      `/.netlify/functions/getBooks?q=${
        searchType === ""
          ? search + "+"
          : "" + searchFields[searchType] + search
      }&index=${index}`,
      {
        mode: "cors",
      }
    );
    const json = await res.json();
    return json;
  }

  let search = "";
  let searchType = "";
  let searchFields = {
    Title: "intitle:",
    Author: "inauthor:",
    ISBN: "isbn:",
    "": "",
  };
  // let promise;
  let sheet = 1;
  let page = 1;
  let index = 0;
  let value;
  let totalItems = 0;
  // let pages = Math.min(10, Math.ceil((totalItems - 200 * (sheet - 1)) / 20));

  if (localStorage.getItem("value")) {
    value = JSON.parse(localStorage.getItem("value"));
    page = Number(localStorage.getItem("page"));
    sheet = Number(localStorage.getItem("sheet"));
    totalItems = Number(localStorage.getItem("totalItems"));
    index = 20 * (page - 1);
    search = localStorage.getItem("search");
    searchType = localStorage.getItem("searchType");
  }

  async function handleClick(event) {
    if (search === "") {
      return;
    }
    event.preventDefault();
    sheet = 1;
    page = 1;
    index = 0;
    localStorage.setItem("search", search);
    localStorage.setItem("sheet", sheet);
    localStorage.setItem("page", page);
    localStorage.setItem("searchType", searchType);
    value = await searchBooks();
    if (value.totalItems >= 0) {
      localStorage.setItem("value", JSON.stringify(value));
      localStorage.setItem("totalItems", value.totalItems);
      totalItems = value.totalItems;
    }
  }

  function handleCancel() {
    search = "";
    localStorage.clear();
    value = null;
    sheet = 1;
    page = 1;
    index = 0;
  }

  async function changePage(i) {
    page = 10 * (sheet - 1) + i + 1;
    index = 20 * (page - 1);
    value = await searchBooks();
    document.documentElement.scrollTop = 0;
    localStorage.setItem("page", page);
    localStorage.setItem("value", JSON.stringify(value));
  }

  async function nextPage() {
    page = page + 1;
    if (page % 10 === 1) {
      sheet = sheet + 1;
    }
    index = 20 * (page - 1);
    value = await searchBooks();
    localStorage.setItem("page", page);
    localStorage.setItem("sheet", sheet);
    localStorage.setItem("value", JSON.stringify(value));
  }

  async function previousPage() {
    page = page - 1;
    if (page % 10 === 0) {
      sheet = sheet - 1;
    }
    index = 20 * (page - 1);
    value = await searchBooks();
    localStorage.setItem("page", page);
    localStorage.setItem("sheet", sheet);
    localStorage.setItem("value", JSON.stringify(value));
  }
</script>

<main
  class="min-h-screen px-8 py-16 md:px-4 lg:px-0 max-w-none bg-warmGray-100"
>
  <h1
    class="text-4xl font-bold tracking-wide text-center text-gray-500 uppercase xs:text-3xl"
  >
    book finder
  </h1>

  <!-- Search form -->
  <form
    class="justify-center hidden max-w-screen-sm mx-auto mt-4 sm:px-[50px] px:10 xs:flex md:px-0"
    action="#"
  >
    <div class="relative flex items-center justify-end w-full text-gray-500">
      <input
        class="w-full px-2 placeholder-gray-300 border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
        type="text"
        placeholder="Title/Author/ISBN"
        required
        bind:value={search}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="absolute w-3 h-3 cursor-pointer right-2"
        viewBox="0 0 20 20"
        fill="currentColor"
        on:click={handleCancel}
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <button
      class="px-4 text-sm font-semibold tracking-wide text-gray-100 transition-colors bg-emerald-500 hover:bg-emerald-600"
      type="submit"
      on:click={handleClick}>Search</button
    >
  </form>
  <div
    class="xs:flex items-center justify-between max-w-screen-sm mx-auto mt-4 text-sm text-gray-500  md:px-[148px] sm:px-12 px:10 hidden"
  >
    <div class="flex items-center gap-4">
      <p>Search only in:</p>
      <div class="flex items-center gap-1">
        <label class="inline-flex items-center">
          <input
            type="radio"
            bind:group={searchType}
            name="searchType"
            value={"Title"}
            class="hidden w-4 h-4 text-emerald-500"
          />
          <span
            class="inline-block px-2 py-1 bg-gray-200  cursor-pointer {searchType ===
            'Title'
              ? 'bg-lightBlue-200 shadow-inner'
              : ''}">Title</span
          >
        </label>
        <label class="inline-flex items-center">
          <input
            type="radio"
            bind:group={searchType}
            name="searchType"
            value={"Author"}
            class="hidden w-4 h-4 text-emerald-500"
          />
          <span
            class="inline-block px-2 py-1 bg-gray-200  cursor-pointer {searchType ===
            'Author'
              ? 'bg-lightBlue-200 shadow-inner'
              : ''}">Author</span
          >
        </label>
        <label class="inline-flex items-center">
          <input
            type="radio"
            bind:group={searchType}
            name="searchType"
            value={"ISBN"}
            class="hidden w-4 h-4 text-emerald-500"
          />
          <span
            class="inline-block px-2 py-1 bg-gray-200 cursor-pointer {searchType ===
            'ISBN'
              ? 'bg-lightBlue-200 shadow-inner'
              : ''}">ISBN</span
          >
        </label>
      </div>
    </div>
    <button
      class="inline-block px-2 py-1 ml-5 bg-gray-300"
      on:click={() => (searchType = "")}>Reset</button
    >
  </div>

  <!-- mobile view -->
  <form class="flex flex-col justify-start mt-8 xs:hidden">
    <div class="relative flex items-center justify-end w-full text-gray-500">
      <input
        class="w-full px-2 placeholder-gray-300 border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
        type="text"
        placeholder="Title/Author/ISBN"
        required
        bind:value={search}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="absolute w-3 h-3 cursor-pointer right-2"
        viewBox="0 0 20 20"
        fill="currentColor"
        on:click={handleCancel}
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <button
      class="px-4 py-2 mt-4 text-sm font-semibold tracking-wide text-gray-100 transition-colors bg-emerald-500 hover:bg-emerald-600"
      on:click={handleClick}
      type="submit">Search</button
    >
  </form>
  <div
    class="flex items-center justify-between mt-4 text-sm text-gray-500 xs:hidden"
  >
    <div class="flex items-center gap-2">
      <p>Search only in:</p>
      <div class="flex items-center gap-1">
        <label class="inline-flex items-center">
          <input
            type="radio"
            bind:group={searchType}
            name="searchType"
            value={"Title"}
            class="hidden w-4 h-4 text-emerald-500"
          />
          <span
            class="inline-block px-2 py-1 bg-gray-200  cursor-pointer {searchType ===
            'Title'
              ? 'bg-lightBlue-200 shadow-inner'
              : ''}">Title</span
          >
        </label>
        <label class="inline-flex items-center">
          <input
            type="radio"
            bind:group={searchType}
            name="searchType"
            value={"Author"}
            class="hidden w-4 h-4 text-emerald-500"
          />
          <span
            class="inline-block px-2 py-1 bg-gray-200  cursor-pointer {searchType ===
            'Author'
              ? 'bg-lightBlue-200 shadow-inner'
              : ''}">Author</span
          >
        </label>
        <label class="inline-flex items-center">
          <input
            type="radio"
            bind:group={searchType}
            name="searchType"
            value={"ISBN"}
            class="hidden w-4 h-4 text-emerald-500"
          />
          <span
            class="inline-block px-2 py-1 bg-gray-200 cursor-pointer {searchType ===
            'ISBN'
              ? 'bg-lightBlue-200 shadow-inner'
              : ''}">ISBN</span
          >
        </label>
      </div>
    </div>
    <button
      class="inline-block px-2 py-1 ml-5 bg-gray-300"
      on:click={() => (searchType = "")}>Reset</button
    >
  </div>

  {#if value}
    <!-- {#await promise then value} -->
    {#if value.items && value.totalItems > 0}
      <div
        class="grid max-w-screen-lg grid-cols-1 mx-auto mt-24 md:grid-cols-2 gap-y-16 lg:justify-items-center lg:gap-x-0 gap-x-4"
      >
        {#each value.items as book}
          <Book {book} />
        {/each}
      </div>

      <!-- Pagination buttons -->
      <div class="grid grid-cols-2 mt-8 md:grid-cols-3">
        {#if page > 1}
          <p
            class="mr-4 text-gray-500 cursor-pointer justify-self-end hover:text-gray-600 lg:mr-0"
            on:click={previousPage}
          >
            &#60; Previous
          </p>
        {:else}
          <p />
        {/if}
        <div class="justify-center hidden md:flex gap-x-1">
          {#if totalItems >= 200 * sheet}
            {#each Array(10) as _, i}
              <p
                class="flex items-center justify-center w-6 h-6 text-sm text-gray-500 bg-gray-300 hover:bg-gray-400 cursor-pointer {page ===
                10 * (sheet - 1) + i + 1
                  ? 'bg-green-500 text-gray-50 cursor-default'
                  : ''}"
                on:click={() => changePage(i)}
              >
                {10 * (sheet - 1) + i + 1}
              </p>
            {/each}
          {:else}
            {#each Array(Math.ceil((totalItems - 200 * (sheet - 1)) / 20)) as _, i}
              <p
                class="flex items-center justify-center w-6 h-6 text-sm text-gray-500 bg-gray-300 hover:bg-gray-400 cursor-pointer {page ===
                10 * (sheet - 1) + i + 1
                  ? 'bg-green-500 text-gray-50 cursor-default'
                  : ''}"
                on:click={() => changePage(i)}
              >
                {10 * (sheet - 1) + i + 1}
              </p>
            {/each}
          {/if}
        </div>
        {#if totalItems > 200 * (sheet - 1) + 20 * page}
          <p
            class="ml-4 text-gray-500 cursor-pointer hover:text-gray-600 lg:ml-0"
            on:click={nextPage}
          >
            Next &#62;
          </p>
        {/if}
      </div>
      <!-- End pagination buttons -->

      <!-- Handle case with no results -->
    {:else if value.totalItems === 0}
      <p class="mx-auto mt-24 text-sm text-center text-gray-500">
        Your search for - {search} - did not match any book results.
      </p>
      <!-- Handle case with no more results -->
    {:else if !value.items}
      <p class="mx-auto mt-24 text-sm text-center text-gray-500">
        Sorry, there was an error, we could not retrieve any more books for this
        search.
      </p>

      <!-- Handle error from server -->
    {:else}
      <div class="mx-auto mt-24 text-sm text-center text-gray-500">
        <p>
          Oops, unfortunately there was an error, the server returned this error
          message:
        </p>
        <p class="mx-auto mt-3 border-b-[1px] border-red-700 max-w-max">
          &#8220;{value}&#8221;
        </p>
      </div>
    {/if}
    <!-- {/await} -->

    <!-- Message to show at the start of the app -->
  {:else}
    <p class="mx-auto mt-24 text-sm text-center text-gray-500">
      Your results will appear here.
    </p>
  {/if}
</main>
