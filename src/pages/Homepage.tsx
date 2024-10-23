function Homepage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <label htmlFor="repoUrl" className="label">
          GitHub Repository
        </label>
        <div className="flex">
          <input
            type="url"
            placeholder="URL"
            className="input input-bordered w-full max-w-xs"
          />
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Homepage;
