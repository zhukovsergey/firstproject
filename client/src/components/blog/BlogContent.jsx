import ReactPlayer from "react-player";

const Img = ({ url, alt, caption }) => {
  return (
    <div>
      <img src={url} alt={alt} className="rounded-lg my-4" />
      {caption.length ? (
        <p className="w-full text-center my-3 md:mb-12  text-base text-dark-grey">
          {caption}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

const Quote = ({ quote, caption }) => {
  return (
    <div className="bg-purple/10 p-3 pl-5 border-l-4 border-purple">
      <p className="text-xl leading-10 md:text-2xl">{quote}</p>
      {caption.length ? (
        <p className=" w-full text-purple text-base">{caption}</p>
      ) : (
        ""
      )}
    </div>
  );
};

const List = ({ style, items }) => {
  return (
    <ol className={`pl-5 ${style == "ordered" ? "list-decimal" : "list-disc"}`}>
      {items.map((listItem, i) => {
        return (
          <li
            key={i}
            className="my-4"
            dangerouslySetInnerHTML={{ __html: listItem }}
          ></li>
        );
      })}
    </ol>
  );
};

const BlogContent = ({ block }) => {
  let { type, data } = block;
  if (type == "paragraph") {
    return (
      <p
        dangerouslySetInnerHTML={{ __html: data.text }}
        className="text-xl leading-8 md:text-md my-4"
      ></p>
    );
  }
  if (type == "header") {
    if (data.level == 3) {
      return (
        <h3
          className="text-2xl font-bold"
          dangerouslySetInnerHTML={{ __html: data.text }}
        ></h3>
      );
    }
    return (
      <h2
        className="text-sm font-bold"
        dangerouslySetInnerHTML={{ __html: data.text }}
      ></h2>
    );
  }
  if (type == "image") {
    return (
      <Img url={data.file.url} alt={data.caption} caption={data.caption} />
    );
  }
  if (type == "embed" && data.service == "youtube") {
    return (
      <div className=" xs:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto flex flex-col items-center justify-center">
        <ReactPlayer
          allowFullScreen
          className="max-w-full mx-auto"
          url={data?.embed}
        />
        <p className="text-center text-sm text-gray-600  ">{data.caption}</p>
      </div>
    );
  }
  if (type == "embed" && data?.service == "rutube") {
    return (
      <div className=" xs:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto flex flex-col items-center justify-center">
        <iframe
          className="max-w-3xl xs:max-w-[400px] md:max-w-full"
          title="rutube"
          width="600"
          height="300"
          src={data.embed}
          frameBorder="0"
          allow="clipboard-write; autoplay"
          webkitAllowFullScreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
        <p className="text-center text-sm text-gray-600  ">{data.caption}</p>
      </div>
    );
  }
  if (type == "quote") {
    return <Quote quote={data.text} caption={data.caption} />;
  }
  if (type == "list") {
    return <List style={data.style} items={data.items} />;
  }

  if (type == "delimiter") {
    return <hr />;
  }
  if (type == "code") {
    return <div dangerouslySetInnerHTML={{ __html: data.html }}></div>;
  }
  if (type == "table") {
    return <div dangerouslySetInnerHTML={{ __html: data.html }}></div>;
  }
  if (type == "link") {
    return (
      <a
        href={data?.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-600 w-full text-center flex justify-center hover:underline hover:text-blue-400"
      >
        {data?.link}
      </a>
    );
  }
};

export default BlogContent;
