// FctUiUtil - Utility routines for the Facet UI

export default class FctUiUtil {

  /**
   * 
   * @param {string} tripleTerminology - 'spo' or 'eav'.
   */
  constructor(triple_terminology = "spo")
  {
    this.tripleTerminology = triple_terminology;
  }

  get tripleTerminology() {
    return this._tripleTerminology;
  }

  set tripleTerminology(value) {
    if (!["spo", "eav"].includes(value.toLowerCase()))
      throw new Error('Unrecognized value');
    this._tripleTerminology = value.toLowerCase();
  }
  
  //
  // TO DO: Document
  //
  // The /fct terminology setting controls the terminology used to describe
  // the search filters being set through Facet XML.
  // The filter descriptions use either 'subject-predicate-object' or
  // 'entity-attribute-value' terminology.
  //
  //  terminology ::= 'spo' | 'eav'
  // 
  // The terminology setting determines the names used for each term in
  // a triple filter:
  //   'Subject' or 'Entity', 'Predicate' or 'Attribute', 'Object' or 'Value'
  // and in instance classification:
  //   'Class' or 'Type'
  //

  fctSubjectTerm() {
    // Equivalent to /fct PL routine fct_s_term
    return this._tripleTerminology === 'spo' ? 'subject' : 'entity';
  }

  fctPredicateTerm() {
    // Equivalent to /fct PL routine fct_p_term
    return this._tripleTerminology === 'spo' ? 'predicate' : 'attribute';
  }

  fctObjectTerm() {
    // Equivalent to /fct PL routine fct_o_term
    return this._tripleTerminology === 'spo' ? 'object' : 'value';
  }

  fctClassTerm() {
    // Equivalent to /fct PL routine fct_t_term
    return this._tripleTerminology === 'spo' ? 'class' : 'type';
  }

  /**
   * Returns a short string form of a URI or a SPARQL blank node identifier for display.
   * @param {*} val 
   */
  fctShortForm(val) {
    // Equivalent of /fct PL routine fct_short_form
    // TO DO: Implement
    // TO DO: Need a client-side equivalent of fct_uri_curie(), but
    // the latter uses Virtuoso function __xml_get_ns_prefix which
    // isn't available to the client.
    return `&lt;${val.toString().trim()}&gt;`;
  }

  cleanHtmlSnippet(html) {
    return html
      .replace(/\n/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

}