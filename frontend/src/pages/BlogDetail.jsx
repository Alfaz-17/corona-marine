import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import api from "../utils/api"; // your axios instance

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch single blog + related blogs
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/blogs"); // fetch all blogs
        const foundBlog = data.find((b) => b._id === id);
        if (!foundBlog) {
          setError("Blog not found");
        } else {
          setBlog(foundBlog);
          setRelatedBlogs(data.filter((b) => b._id !== foundBlog._id).slice(0, 3));
        }
      } catch (err) {
        setError("Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 classname="font-heading text-2xl font-bold text-marine-navy mb-4">
            {error || "Article Not Found"}
          </h2>
          <Link to="/blog" className="btn btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareText = `Check out this article: ${blog.title}`;

  return (
    <div>
      <article className="py-20 bg-base-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/blog" className="btn btn-ghost mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            {/* Article Header */}
            <header className="mb-8">
              <h1 classname="font-heading text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-4 mb-8">
                <span classname="font-sans  text-gray-600 flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share:
                </span>
                <div className="flex gap-2">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle btn-sm btn-outline"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      shareText
                    )}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle btn-sm btn-outline"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-circle btn-sm btn-outline"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <figure className="mb-8">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-96 object-cover rounded-lg shadow-xl"
              />
            </figure>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p classname="font-sans text-xl text-gray-600 mb-6 font-medium">{blog.excerpt}</p>

              <div className="text-gray-700 leading-relaxed space-y-6">
                {blog.content.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="py-20 bg-base-200">
          <div className="container mx-auto px-4">
            <h2 classname="font-heading text-3xl font-bold text-slate-800 mb-12 text-center">
              Related Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {relatedBlogs.map((relatedBlog, index) => (
                <motion.article
                  key={relatedBlog._id}
                  className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <figure>
                    <img
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className="w-full h-48 object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 classname="font-heading card-title text-slate-800 hover:text-blue-600 transition-colors">
                      <Link to={`/blog/${relatedBlog._id}`}>{relatedBlog.title}</Link>
                    </h3>
                    <p classname="font-sans text-gray-600">{relatedBlog.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(relatedBlog.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <Link to={`/blog/${relatedBlog._id}`} className="btn btn-primary btn-sm">
                        Read More
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetail;
